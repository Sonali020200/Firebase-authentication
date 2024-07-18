"use client";

import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const FinishSignUp: React.FC = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const completeSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        try {
          await signInWithEmailLink(auth, email!, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          setMessage('Sign-in successful!');
          router.push('/dashboard');
        } catch (error) {
          setMessage('Error completing sign-in.');
        }
      }
    };

    completeSignIn();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default FinishSignUp;
