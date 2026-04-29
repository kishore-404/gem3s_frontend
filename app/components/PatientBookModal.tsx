'use client';

import { useState, useEffect } from 'react';
import API from '@/services/api';

interface PatientBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PatientBookModal({ isOpen, onClose, onSuccess }: PatientBookModalProps) {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); 
  const [globalError, setGlobalError] = useState<string | null>(null); 
  const [form, setForm] = useState({
    doctorId: '',
    date: '',
    startTime: '',
    endTime: '',
    patientName: '',
    age: '',
    problem: '',
  });

 
  const todayDateStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (isOpen) {
      setErrors({}); 
      setGlobalError(null);
      const fetchDoctors = async () => {
        try {
          const response = await API.get('/doctor');
          setDoctors(response.data);
        } catch (error) {
          console.error('Failed to fetch doctors', error);
        }
      };
      fetchDoctors();
    }
  }, [isOpen]);

  if (!isOpen) return null;


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.doctorId) newErrors.doctorId = 'Please select a doctor.';
    if (!form.date) newErrors.date = 'Please select a date.';
    if (!form.startTime) newErrors.startTime = 'Start time is required.';
    if (!form.endTime) newErrors.endTime = 'End time is required.';
    if (!form.patientName.trim()) newErrors.patientName = 'Patient Name is required.';
    if (!form.age) newErrors.age = 'Age is required.';
    if (!form.problem.trim()) newErrors.problem = 'Problem description is required.';

   
    if (form.date) {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Please choose today or a future date.";
      }
    }

    
    if (form.startTime && form.endTime && form.startTime >= form.endTime) {
      newErrors.endTime = 'End time must be after the start time.';
    }

    setErrors(newErrors);
    
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null); 

   
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await API.post('/appointment', form);
      
      setTimeout(() => {
        onSuccess();
        onClose();
        setLoading(false);
        setForm({
          doctorId: '', date: '', startTime: '', endTime: '', patientName: '', age: '', problem: ''
        });
      }, 500);
    } catch (error) {
      console.error('Failed to book appointment', error);
      // Specific error message requested for API overlaps
      setGlobalError('Booking slot is not available book different slot timing.');
      setLoading(false);
    }
  };

 
  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4 overflow-y-auto">
    
      <div className="bg-white w-full max-w-3xl rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-8 md:p-12 animate-in fade-in zoom-in-95 duration-200 border-[2px] border-gray-200 my-auto">
        
        
        <h2 className="text-4xl font-serif text-black mb-10 tracking-wide">Appointments</h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          
          
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
            <label className="md:w-1/4 text-[20px] font-serif text-black md:pt-3">Doctor</label>
            <div className="flex-1 flex flex-col">
              <div className="relative">
                <select
                  className={`w-full rounded-full border px-6 py-3.5 focus:outline-none focus:ring-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-lg appearance-none cursor-pointer transition-colors ${errors.doctorId ? 'border-[#da292e] focus:border-[#da292e] focus:ring-[#da292e] bg-red-50 text-gray-900' : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400 bg-white text-gray-600'}`}
                  value={form.doctorId}
                  onChange={(e) => {
                    setForm({ ...form, doctorId: e.target.value });
                    clearError('doctorId');
                  }}
                >
                  <option value="" disabled hidden>Select your doctor</option>
                  {doctors.map(doc => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name} - {doc.specialization}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-gray-400">
                  <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.doctorId && <span className="text-[#da292e] text-sm mt-1.5 ml-4 font-medium">{errors.doctorId}</span>}
            </div>
          </div>

        
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
            <label className="md:w-1/4 text-[20px] font-serif text-black md:pt-3">Date</label>
            <div className="flex-1 flex flex-col">
              <input
                type="date"
                min={todayDateStr}
                className={`w-full rounded-full border px-6 py-3.5 focus:outline-none focus:ring-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-lg transition-colors ${errors.date ? 'border-[#da292e] focus:border-[#da292e] focus:ring-[#da292e] bg-red-50 text-gray-900' : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400 bg-white text-gray-600'}`}
                onChange={(e) => {
                  setForm({ ...form, date: e.target.value });
                  clearError('date');
                }}
                value={form.date}
              />
              {errors.date && <span className="text-[#da292e] text-sm mt-1.5 ml-4 font-medium">{errors.date}</span>}
            </div>
          </div>

          
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
            <label className="md:w-1/4 text-[20px] font-serif text-black md:pt-1">Select time</label>
            <div className="flex-1 flex flex-col xl:flex-row items-start gap-6 xl:gap-10">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-black text-[20px]">Start time :</span>
                  <input
                    type="time"
                    className={`rounded-md border border-transparent px-3 py-1.5 focus:outline-none focus:ring-2 text-gray-600 text-lg shadow-inner w-32 transition-colors ${errors.startTime ? 'ring-2 ring-[#da292e] bg-red-50' : 'bg-gray-200 focus:ring-[#126b8a]'}`}
                    onChange={(e) => {
                      setForm({ ...form, startTime: e.target.value });
                      clearError('startTime');
                    }}
                    value={form.startTime}
                  />
                </div>
                {errors.startTime && <span className="text-[#da292e] text-sm mt-1 ml-[110px] font-medium">{errors.startTime}</span>}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-black text-[20px]">End time :</span>
                  <input
                    type="time"
                    className={`rounded-md border border-transparent px-3 py-1.5 focus:outline-none focus:ring-2 text-gray-600 text-lg shadow-inner w-32 transition-colors ${errors.endTime ? 'ring-2 ring-[#da292e] bg-red-50' : 'bg-gray-200 focus:ring-[#126b8a]'}`}
                    onChange={(e) => {
                      setForm({ ...form, endTime: e.target.value });
                      clearError('endTime');
                    }}
                    value={form.endTime}
                  />
                </div>
                {errors.endTime && <span className="text-[#da292e] text-sm mt-1 ml-[95px] font-medium">{errors.endTime}</span>}
              </div>

            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
            <label className="md:w-1/4 text-[20px] font-serif text-black md:pt-3">Patient Name</label>
            <div className="flex-1 flex flex-col">
              <input
                type="text"
                className={`w-full rounded-full border px-6 py-3.5 focus:outline-none focus:ring-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-lg transition-colors ${errors.patientName ? 'border-[#da292e] focus:border-[#da292e] focus:ring-[#da292e] bg-red-50' : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400 bg-white'}`}
                onChange={(e) => {
                  setForm({ ...form, patientName: e.target.value });
                  clearError('patientName');
                }}
                value={form.patientName}
              />
              {errors.patientName && <span className="text-[#da292e] text-sm mt-1.5 ml-4 font-medium">{errors.patientName}</span>}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
            <label className="md:w-1/4 text-[20px] font-serif text-black md:pt-3">Age</label>
            <div className="flex-1 flex flex-col">
              <input
                type="number"
                min="0"
                className={`w-full rounded-full border px-6 py-3.5 focus:outline-none focus:ring-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-lg transition-colors ${errors.age ? 'border-[#da292e] focus:border-[#da292e] focus:ring-[#da292e] bg-red-50' : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400 bg-white'}`}
                onChange={(e) => {
                  setForm({ ...form, age: e.target.value });
                  clearError('age');
                }}
                value={form.age}
              />
              {errors.age && <span className="text-[#da292e] text-sm mt-1.5 ml-4 font-medium">{errors.age}</span>}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 pt-2">
            <div className="hidden md:block md:w-1/4"></div>
            <div className="flex-1 flex flex-col">
              <textarea
                placeholder="Problem description"
                className={`w-full rounded-[24px] border px-6 py-5 focus:outline-none focus:ring-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-lg min-h-[130px] resize-y placeholder-gray-400 font-serif transition-colors ${errors.problem ? 'border-[#da292e] focus:border-[#da292e] focus:ring-[#da292e] bg-red-50' : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400 bg-white'}`}
                onChange={(e) => {
                  setForm({ ...form, problem: e.target.value });
                  clearError('problem');
                }}
                value={form.problem}
              />
              {errors.problem && <span className="text-[#da292e] text-sm mt-1.5 ml-6 font-medium">{errors.problem}</span>}
            </div>
          </div>

          {globalError && (
            <div className="flex justify-center md:justify-end md:pr-10 pt-2 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-[#da292e] font-medium text-center md:text-right flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {globalError}
              </p>
            </div>
          )}

          <div className="pt-4 flex flex-col-reverse sm:flex-row justify-center gap-4 md:gap-8">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#da292e] hover:bg-[#c32227] text-white font-serif text-[22px] tracking-wide py-2.5 px-16 rounded-full transition-transform hover:scale-105 duration-300 shadow-md w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#126b8a] hover:bg-[#0e566f] text-white font-serif text-[22px] tracking-wide py-2.5 px-16 rounded-full transition-transform hover:scale-105 duration-300 shadow-md disabled:opacity-70 disabled:hover:scale-100 w-full sm:w-auto"
            >
              {loading ? 'Booking...' : 'Book'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}