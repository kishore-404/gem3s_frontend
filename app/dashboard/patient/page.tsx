'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';

export default function PatientDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get('/appointment');

      setData({
        totalBookings: res.data.length,
        bookings: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Patient Dashboard</h1>

      <h2>Total Bookings: {data.totalBookings}</h2>

      <h3>My Bookings</h3>
      <ul>
        {data.bookings.map((b: any) => (
          <li key={b._id}>
            {b.doctorName} - {b.date}
          </li>
        ))}
      </ul>
    </div>
  );
}