// Contact form to send to the founder

import React, { useState } from 'react';

import { validateEmail } from '../../utils/helpers'


function ContactForm() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const { name, email, message } = formState;
    const [errorMessage, setErrorMessage] = useState('');

    function handleChange(e) {
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            console.log(isValid);
            // isValid conditional statement
            if (!isValid) {
                setErrorMessage('Your email is invalid.');
            } else {
                setErrorMessage('');
            }
        } else {
            if (!e.target.value.length) {
              setErrorMessage(`${e.target.name} is required.`);
            } else {
              setErrorMessage('');
            }
        }

        // console.log('errorMessage', errorMessage);

        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
        }
    }
      
    console.log(formState);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formState);
    }

    // JSX
    return (
        <section className="contact-form-section">
            <h1 className="contact-h1" data-testid="h1tag">Contact Chelcie</h1>
            <div className="contact--form">
            <form id="contact-form" onSubmit={handleSubmit}>
                <div className="form-line">
                    <label className="label" htmlFor="name">Name:</label>
                    <input className="input" type="text" defaultValue={name} onBlur={handleChange} name="name" />
                </div>
                <div className="form-line">
                    <label className="label" htmlFor="email">Email address:</label>
                    <input className="input" type="email" defaultValue={email} name="email" onBlur={handleChange} />
                </div>
                <div className="form-line">
                    <label className="label" htmlFor="message">Message:</label>
                    <textarea className="textarea" name="message" defaultValue={message} onBlur={handleChange} rows="5" />
                </div>
            </form>
            {errorMessage && (
                <div>
                    <p className="error-text">{errorMessage}</p>
                </div>
            )}
            <button id="btn-submit-form" data-testid="button" type="submit">Submit</button>
            </div>
        </section>
    );


}
    
export default ContactForm;