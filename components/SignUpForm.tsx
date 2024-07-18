"use client";

import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const actionCodeSettings = {
      url: 'http://localhost:3000/finishSignUp',
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage('Check your email for the link to complete the sign-up.');
    } catch (error) {
      setMessage('Error sending email link.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Sign Up with Email Link</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Send Link</button>
        {message && <p className="mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;
