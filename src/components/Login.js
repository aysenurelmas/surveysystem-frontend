// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosInstance';
import '../Styles/Login.css'; // Ekstra stil eklemek için kullanılacak

function LoginTest() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/Auth/login', { email, password });
      const { token } = response.data.accessToken;
      setToken(token);
      localStorage.setItem('token', token);
      navigate('/surveys');
    } catch (error) {
      console.error('Login error:', error);
      alert('Giriş başarısız!');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Hoşgeldiniz</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="button-container">
            <button type="submit" className="btn btn-primary">Giriş Yap</button>
            <Link to="/register" className="btn btn-secondary">
              Kayıt Ol
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginTest;
