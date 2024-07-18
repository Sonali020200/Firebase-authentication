// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/log-in');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = () => {
    signOut(auth);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Welcome, {user.email}</h1>
      <button onClick={handleSignOut} className="bg-red-500 text-white p-2 rounded">Sign Out</button>
    </div>
  );
};

export default Dashboard;
