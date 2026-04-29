'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [expandedApptId, setExpandedApptId] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await API.get('/appointment');
      
      const rawData = response.data;

      // 1. Sort the array by Date first, then by Start Time
      const sortedAppointments = rawData.sort((a: any, b: any) => {
        // Compare Dates
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        
        if (dateA !== dateB) {
          return dateA - dateB; // Earliest date first
        }

        // If dates are the same, compare Start Times
        // We can safely string compare "10:00" vs "14:30"
        if (a.startTime < b.startTime) return -1;
        if (a.startTime > b.startTime) return 1;
        return 0;
      });

      setAppointments(sortedAppointments); 
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedApptId(expandedApptId === id ? null : id);
  };

  // 2. Helper function to format "YYYY-MM-DD" to "DD/MM/YYYY"
  const formatDateToDDMMYYYY = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'scheduled': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="w-full">
      
      <div className="mb-8">
        <h1 className="text-gray-800 font-serif text-lg md:text-xl">
          total number of Appointment : {loading ? '...' : appointments.length}
        </h1>
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block w-full border-[2px] border-gray-300 rounded-[20px] overflow-hidden shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-center border-collapse">
            <thead>
              <tr className="border-b-[2px] border-gray-300 bg-white">
                <th className="py-6 px-4 font-serif text-gray-800 font-normal border-r border-gray-300 w-1/4">Patient Name</th>
                <th className="py-6 px-4 font-serif text-gray-800 font-normal border-r border-gray-300 w-1/4">Doctor Name</th>
                <th className="py-6 px-4 font-serif text-gray-800 font-normal border-r border-gray-300 w-1/4">Date & Time</th>
                <th className="py-6 px-4 font-serif text-gray-800 font-normal w-1/4">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="py-12 text-gray-400">Loading appointments...</td></tr>
              ) : appointments.length === 0 ? (
                <tr><td colSpan={4} className="py-12 text-gray-400">No appointments found.</td></tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt._id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                    <td className="py-10 px-4 text-gray-700 border-r border-gray-300 font-medium">
                      {appt.patientName}
                    </td>
                    <td className="py-10 px-4 text-gray-700 border-r border-gray-300">
                      {appt.doctorId?.name || 'Unknown Doctor'}
                    </td>
                    <td className="py-10 px-4 text-gray-700 border-r border-gray-300">
                      <div className="flex flex-col">
                        {/* Applied DD/MM/YYYY formatting here */}
                        <span>{formatDateToDDMMYYYY(appt.date)}</span>
                        <span className="text-sm text-gray-500">{appt.startTime} - {appt.endTime}</span>
                      </div>
                    </td>
                    <td className="py-10 px-4">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden flex flex-col gap-3">
        {loading ? (
          <div className="p-6 text-center text-gray-400 border-[2px] border-gray-300 rounded-[20px] bg-white">
            Loading appointments...
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-6 text-center text-gray-400 border-[2px] border-gray-300 rounded-[20px] bg-white">
            No appointments found.
          </div>
        ) : (
          appointments.map((appt) => (
            <div 
              key={appt._id} 
              className="border-[2px] border-gray-300 rounded-[16px] overflow-hidden bg-white shadow-sm transition-all duration-300"
            >
              <button 
                onClick={() => toggleExpand(appt._id)}
                className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-serif text-lg text-gray-800">{appt.patientName}</span>
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium tracking-wide uppercase ${getStatusColor(appt.status)}`}>
                    {appt.status}
                  </span>
                </div>
                
                <div className={`transform transition-transform duration-300 text-gray-500 ${expandedApptId === appt._id ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out ${
                  expandedApptId === appt._id ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 border-t border-gray-200 bg-gray-50 flex flex-col gap-3 text-[15px]">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Doctor</span>
                    <span className="font-medium text-gray-800">{appt.doctorId?.name || 'Unknown Doctor'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Date</span>
                    {/* Applied DD/MM/YYYY formatting here */}
                    <span className="font-medium text-gray-800">{formatDateToDDMMYYYY(appt.date)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium text-gray-800">{appt.startTime} - {appt.endTime}</span>
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-gray-500 mb-1">Problem Description</span>
                    <span className="font-medium text-gray-800 bg-white p-2 border border-gray-200 rounded-md text-sm">
                      {appt.problem || 'No description provided.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}