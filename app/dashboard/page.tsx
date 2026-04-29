'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.role === 'admin') {
      router.push('/dashboard/admin/doctor');
    } else if (payload.role === 'patient') {
      router.push('/dashboard/patient/appointment');
    }
  }, []);

  return <div>Redirecting...</div>;
}