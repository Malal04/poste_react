import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accueil from './Pages/Accueil';
import Home from './Pages/Home';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import { AppContent } from './Content/AppContent';
import Create from './Pages/Postes/Create';
import Show from './Pages/Postes/Show';
import Update from './Pages/Postes/Update';
import './App.css';

export default function App() {
  const { user } = useContext(AppContent);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />}>
          <Route index element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/create" element={user ? <Create /> : <Login />} />
          <Route path="/posts/:id" element={<Show />} />
          <Route path="/posts/update/:id" element={user ? <Update /> : <Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  
}
