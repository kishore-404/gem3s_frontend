'use client';

import { useState, useEffect } from 'react';
import API from '@/services/api';

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddDoctorModal({ isOpen, onClose, onSuccess }: AddDoctorModalProps) {
  const [loading, setLoading] = useState(false);
  
  // Validation error states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    specialization: '',
    startTime: '',
    endTime: '',
    timeZone: '',
  });

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setGlobalError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.trim()) newErrors.name = 'Doctor name is required.';
    if (!form.specialization.trim()) newErrors.specialization = 'Specialization is required.';
    if (!form.startTime) newErrors.startTime = 'Start time is required.';
    if (!form.endTime) newErrors.endTime = 'End time is required.';
    if (!form.timeZone) newErrors.timeZone = 'Please select a time zone.';
    if (form.startTime && form.endTime && form.startTime >= form.endTime) {
      newErrors.endTime = 'End time must be after start time.';
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
      
      await API.post('/doctor', form);
      
      setTimeout(() => {
        onSuccess();
        onClose();
        setLoading(false);
        setForm({
          name: '',
          specialization: '',
          startTime: '',
          endTime: '',
          timeZone: '',
        });
      }, 500);
    } catch (error) {
      console.error('Failed to add doctor', error);
      setGlobalError('Failed to add doctor. Please try again.');
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
        
       
        <h2 className="text-4xl font-serif text-black mb-10 tracking-wide">Doctor</h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          
          
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
            <label className="md:w-1/4 text-[20px] font-serif text-black md:pt-3">Name</label>
            <div className="flex-1 flex flex-col">
              <input
                type="text"
                className={`w-full rounded-full border px-6 py-3.5 focus:outline-none focus:ring-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-lg transition-colors ${errors.name ? 'border-[#da292e] focus:border-[#da292e] focus:ring-[#da292e] bg-red-50 text-gray-900' : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400 bg-white text-gray-800'}`}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  clearError('name');
                }}
                value={form.name}
              />
              {errors.name && <span className="text-[#da292e] text-sm mt-1.5 ml-4 font-medium">{errors.name}</span>}
            </div>
          </div>

          
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
            <label className="md:w-1/4 text-[20px] font-serif text-black md:pt-3">Specialization</label>
            <div className="flex-1 flex flex-col">
              <input
                type="text"
                className={`w-full rounded-full border px-6 py-3.5 focus:outline-none focus:ring-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-lg transition-colors ${errors.specialization ? 'border-[#da292e] focus:border-[#da292e] focus:ring-[#da292e] bg-red-50 text-gray-900' : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400 bg-white text-gray-800'}`}
                onChange={(e) => {
                  setForm({ ...form, specialization: e.target.value });
                  clearError('specialization');
                }}
                value={form.specialization}
              />
              {errors.specialization && <span className="text-[#da292e] text-sm mt-1.5 ml-4 font-medium">{errors.specialization}</span>}
            </div>
          </div>

         
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
            <label className=" text-[20px] font-serif text-black md:pt-1">Working time</label>
            <div className="flex-1 flex flex-col xl:flex-row items-start gap-6 xl:gap-10">
              
              
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-black text-[20px]">Start time</span>
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
                {errors.startTime && <span className="text-[#da292e] text-sm mt-1 ml-[100px] font-medium">{errors.startTime}</span>}
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
            <label className="md:w-1/4 text-[20px] font-serif text-black md:pt-3">Time Zone</label>
            <div className="flex-1 flex flex-col">
              <div className="relative">
                <select
                  className={`w-full rounded-full border px-6 py-3.5 focus:outline-none focus:ring-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-lg appearance-none cursor-pointer transition-colors ${errors.timeZone ? 'border-[#da292e] focus:border-[#da292e] focus:ring-[#da292e] bg-red-50 text-gray-900' : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400 bg-white text-gray-500'}`}
                  value={form.timeZone}
                  onChange={(e) => {
                    setForm({ ...form, timeZone: e.target.value });
                    clearError('timeZone');
                  }}
                >
                  <option value="" disabled hidden>Select the timezone</option>
                  <option value="IST">IST (Indian Standard Time)</option>
                  <option value="UTC">UTC (Universal Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                </select>
               
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-gray-400">
                  <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.timeZone && <span className="text-[#da292e] text-sm mt-1.5 ml-4 font-medium">{errors.timeZone}</span>}
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

          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#da292e] hover:bg-[#c32227] text-white font-serif text-[22px] tracking-wide py-2.5 px-14 rounded-full transition-transform hover:scale-105 duration-300 shadow-md w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#126b8a] hover:bg-[#0e566f] text-white font-serif text-[22px] tracking-wide py-2.5 px-10 rounded-full transition-transform hover:scale-105 duration-300 shadow-md disabled:opacity-70 disabled:hover:scale-100 w-full sm:w-auto"
            >
              {loading ? 'Adding...' : 'Add Doctors'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}