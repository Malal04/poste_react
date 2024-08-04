import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppContent } from '../Content/AppContent';

export default function Accueil() {
  const { user, token, setUser, setToken } = useContext(AppContent);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const res = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      navigate('/');
    } else {
      console.error('Error logging out');
    }
  }
  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          {user ? (
            <div className="space-x-2 flex items-center">
              <p className="text-slate-400 text-xs">Welcome back {user.name}</p>
              <Link to="/create" className="nav-link">New POst</Link>
              <form onSubmit={handleLogout}>
                <button type="submit" className="nav-link">Logout</button>
              </form>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/register" className="nav-link">Register</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </div>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
  
}
