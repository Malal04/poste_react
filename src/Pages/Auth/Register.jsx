import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContent } from '../../Content/AppContent';

export default function Register() {
  const { setToken } = useContext(AppContent);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('/');
    }
  }

  return (
    <>
      <h1 className="title">Register a new account</h1>

      <form className="w-1/2 mx-auto space-y-6" onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email : e.target.value })}
          />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password : e.target.value })}
          />
          {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={(e) => setFormData({ ...formData, password_confirmation : e.target.value })}
          />
          {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation[0]}</p>}
        </div>

        <button type="submit" className="primary-btn">Register</button>

        <p className="text-black">
          Already have an account?{' '}
          <Link to="/login" className="text-red-900">Login</Link>
        </p>
      </form>
    </>
  );
}
