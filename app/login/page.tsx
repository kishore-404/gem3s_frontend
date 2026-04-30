'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '@/services/api'; 
import Navbar from '@/app/components/navbar';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      
      setTimeout(() => {
        router.push('/dashboard');
        setLoading(false);
      }, 1000);
      
    } catch (err: any) {
      console.error('Login failed', err);
      alert('Login failed. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-4">

        <div className="w-full max-w-[480px] border border-gray-300 rounded-[32px] px-8 py-10 bg-white">
          
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-serif text-gray-900 tracking-tight mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-700 font-medium">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 px-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-3.5 rounded-full border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-6 py-3.5 rounded-full border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                     <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                     <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            <div className="pl-4">
              <a href="#" className="text-[15px] text-[#2c86a6] hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#126b8a] hover:bg-[#0e566f] text-white font-medium text-base md:text-lg tracking-wide py-3 px-16 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#126b8a] disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? 'LOGGING IN...' : 'LOGIN'}
              </button>
            </div>

          </form>
        </div>

        <div className="mt-8 text-[15px] font-medium text-gray-800">
           Don't have an account?{' '}
           <a href="/register" className="text-[#ef534e] hover:underline">
             Sign up
           </a>
        </div>

      </main>
    </div>
  );
}