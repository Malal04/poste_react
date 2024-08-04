import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContent } from '../../Content/AppContent';

export default function Login() {
  const { setToken } = useContext(AppContent);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErrors({}); 
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();

      if (data.errors) {
        setErrors(data.errors);
      } else {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setErrors({ general: ['An unexpected error occurred.'] });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="title">Login</h1>
      <form className="w-1/2 mx-auto space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            aria-label="Email"
            required
            className="input"
          />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            aria-label="Password"
            required
            className="input"
          />
          {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
        </div>

        {errors.general && <p className="text-red-500">{errors.general[0]}</p>}

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-black">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-900">Register</Link>
        </p>
      </form>
    </>
  );
}
