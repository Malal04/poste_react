import React, { createContext, useEffect, useState } from 'react';

export const AppContent = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  async function getUser() {
    const res = await fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

    if (res.ok) {
      const data = await res.json();
      setUser(data);
    } else {
      console.error('Failed to fetch user data');
      setUser(null);
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContent.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContent.Provider>
  );
}
