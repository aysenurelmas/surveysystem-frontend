// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav>
      <ul style={{ textAlign: 'center', marginTop: '10px' }}>
        {isAuthenticated() ? (
          <>
          <li><Link to="/create">Anket Oluştur</Link></li>
          <li><Link to="/surveys">Anketler</Link></li>
          <li onClick={logout}><Link to="/">Çıkış Yap</Link></li>
        </>
        ) : (
          <>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
