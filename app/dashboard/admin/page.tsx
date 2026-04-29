'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appointments, doctors] = await Promise.all([
        API.get('/appointment'),
        API.get('/doctor'),
      ]);

      setData({
        totalAppointments: appointments.data.length,
        totalDoctors: doctors.data.length,
        doctors: doctors.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Total Appointments: {data.totalAppointments}</h2>
      <h2>Total Doctors: {data.totalDoctors}</h2>

      <h3>Doctor List</h3>
      <ul>
        {data.doctors.map((d: any) => (
          <li key={d._id}>
            {d.name} ({d.specialization})
          </li>
        ))}
      </ul>
    </div>
  );
}