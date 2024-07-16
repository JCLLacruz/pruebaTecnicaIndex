import React, { useState } from 'react';
import Form from '../Form/Form';
import * as Yup from 'yup';
import './ViewForm.scss';

const userValues ={
    inputs: [
        {
            key: 'firstname',
            label: 'Firstname',
            type: 'text',
            placeholder: 'Enter your firstname',
            validationSchema: Yup.string().required('Firstname is required'),
        },
        {
            key: 'surname',
            label: 'Surname',
            type: 'text',
            placeholder: 'Enter your surname',
            validationSchema: Yup.string().required('Surname is required'),
        },
        {
            key: 'email',
            label: 'Email address',
            type: 'text',
            placeholder: 'Enter your email address',
            validationSchema: Yup.string().email('Invalid email address').required('Email is required'),
        },
        {
            key: 'phoneNumber',
            label: 'Phone number',
            type: 'text',
            placeholder: 'Enter your phone number',
            validationSchema: Yup.string()
                .required('Phone number is required')
                .matches(/^\d{9,}$/, 'Phone number must be a number of 9 or more digits'),
        },
        {
            key: 'message',
            label: 'Message',
            type: 'text',
            placeholder: 'You can write us a suggestion',
            validationSchema: Yup.string().required('Suggestion is required'),
        },
        {
            key: 'country',
            label: 'Country',
            type: 'select',
            options: ['España', 'Peru', 'Chile', 'Argentina', 'Brasil'],
            placeholder: 'Select your country',
            validationSchema: Yup.string().required('Country is required'),
        },
    ],
    header: 'New User',
}
const clientValues = {
    inputs: [
        {
            key: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'Enter your username',
            validationSchema: Yup.string().required('Username is required'),
        },
        {
            key: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            validationSchema: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters'),
        },
        {
            key: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm your password',
            validationSchema: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        },
        {
            key: 'birthdate',
            label: 'Birthdate',
            type: 'date',
            placeholder: 'Enter your birthdate',
            validationSchema: Yup.date().required('Birthdate is required'),
        },
        {
            key: 'gender',
            label: 'Gender',
            type: 'select',
            options: ['Male', 'Female', 'Other'],
            placeholder: 'Select your gender',
            validationSchema: Yup.string().required('Gender is required'),
        },
        {
            key: 'address',
            label: 'Address',
            type: 'text',
            placeholder: 'Enter your address',
            validationSchema: Yup.string().required('Address is required'),
        },
        {
            key: 'postalCode',
            label: 'Postal Code',
            type: 'text',
            placeholder: 'Enter your postal code',
            validationSchema: Yup.string()
                .required('Postal Code is required')
                .matches(/^\d{5}$/, 'Postal Code must be exactly 5 digits'),
        },
        {
            key: 'occupation',
            label: 'Occupation',
            type: 'select',
            options: ['Student', 'Employed', 'Self-Employed', 'Unemployed'],
            placeholder: 'Select your occupation',
            validationSchema: Yup.string().required('Occupation is required'),
        },
    ],
    header: 'New Client',
}


const ViewForm = () => {
    const [formType, setFormType] = useState('user');
    const [inputs, setInputs] = useState(userValues.inputs);
    const [header, setHeader] = useState(userValues.header);

    const handleClick = (e) => {
        e.preventDefault();
        switch (true) {
            case e.target.value === 'user':
                setFormType('user');
                setInputs(userValues.inputs);
                setHeader(userValues.header);
                break;
            case e.target.value === 'client':
                setFormType('client');
                setInputs(clientValues.inputs);
                setHeader(clientValues.header);
                break;
            default:
                break;
        }
    }
	return (
		<div className='reusableDiv'> 
			<h1>Reusable forms</h1>
            <div className='buttonsDiv'>
			<button value='user' onClick={handleClick}>User Form</button>
			<button value='client' onClick={handleClick}>Client Form</button>
            </div>
			<div>
				<Form inputs={inputs} header={header} />
			</div>
		</div>
	);
};

export default ViewForm;
