import { useEffect, useState } from 'react';
import './Form.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { alertIcon } from '../../assets/icons/icons';

const Form = ({ header, inputs }) => {
	const initialValuesFormik = inputs.reduce((acc, input) => {
		acc[input.key] = '';
		return acc;
	}, {});

	const initialValuesState = inputs.reduce((acc, input) => {
		acc[input.key] = { isActive: false };
		return acc;
	}, {});

	const initialValuesSchema = inputs.reduce((acc, input) => {
		if (input.validationSchema) {
			acc[input.key] = input.validationSchema;
		}
		return acc;
	}, {});

	const [inputsState, setInputsState] = useState({});
	const [hidden, setHidden] = useState(true);
	const [modalContent, setModalContent] = useState({});

	console.log('hidden', hidden);

	useEffect(() => {
		setInputsState(initialValuesState);
	}, [inputs]);

	const handleFocus = (name) => {
		setInputsState((prevState) => ({
			...prevState,
			[name]: { ...prevState[name], isActive: true },
		}));
	};

	const handleBlur = (name) => {
		setInputsState((prevState) => ({
			...prevState,
			[name]: { ...prevState[name], isActive: false },
		}));
	};

	const shouldShowPlaceholder = (name) => {
		return !inputsState[name]?.isActive && !formik.values[name];
	};

	const closeModal = () => {
		setHidden(true);
	};

	const formik = useFormik({
		initialValues: initialValuesFormik,
		validationSchema: Yup.object().shape(initialValuesSchema),
		onSubmit: (values) => {
			console.log('values', values);
			setModalContent(values);
			setHidden(false);
			formik.resetForm();
		},
	});

	return (
		<div className='container'>
			<div className='formDiv'>
			<form className='userForm' onSubmit={formik.handleSubmit}>
				<h1 className='userFormH1'>{header}</h1>
				{inputs.map((input) => (
					<div
						key={input.key}
						className={`inputGroup ${inputsState[input.key]?.isActive ? 'active' : ''} ${
							formik.errors[input.key] && formik.touched[input.key] ? 'error' : ''
						}`}
					>
						<label htmlFor={input.key}>{input.label}</label>
						<div className='inputBox'>
							{input.type === 'select' ? (
								<select
									id={input.key}
									name={input.key}
									value={formik.values[input.key]}
									onFocus={() => handleFocus(input.key)}
									onChange={formik.handleChange}
									onBlur={() => {
										handleBlur(input.key);
										formik.handleBlur(input.key);
									}}
									onKeyUp={formik.handleChange}
									className='select'
									placeholder={input.placeholder}
								>
									<option value='' disabled hidden>
										{input.placeholder}
									</option>
									{input.options.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							) : (
								<input
									className='input'
									id={input.key}
									name={input.key}
									value={formik.values[input.key]}
									onFocus={() => handleFocus(input.key)}
									onBlur={() => {
										handleBlur(input.key);
										formik.handleBlur(input.key);
									}}
									onChange={formik.handleChange}
									type={input.type}
								/>
							)}
							{formik.errors[input.key] && formik.touched[input.key] && (
								<div>
									<div className='alertIcon'>{alertIcon}</div>
									<div className='hintErrorDiv error'>{formik.errors[input.key]}</div>
								</div>
							)}
							{!formik.errors[input.key] && shouldShowPlaceholder(input.key) && <div className='hintErrorDiv placeholder'>{input.placeholder}</div>}
						</div>
					</div>
				))}
				<input type='submit' className='submit' value='Submit' />
			</form>
			</div>
			<div className={hidden ? 'containerModal hidden' : 'containerModal'}>
				<div className='buttonDiv'>
				<button onClick={closeModal}>Close</button>
				</div>
				<div className='modal'>
					<div className='modalContent'>
						<h2>Submitted Form Data</h2>
						<ul>
							{Object.entries(modalContent).map(([key, value]) => (
								<li key={key}>
									<strong>{key}: </strong> {value}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Form;
