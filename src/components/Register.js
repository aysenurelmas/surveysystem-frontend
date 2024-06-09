// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:44331/api/Auth/register', { firstName, lastName, email, password });
      alert('Kayıt başarılı! Giriş yapabilirsiniz.');
    } catch (error) {
      console.error('Register error:', error);
      alert('Kayıt başarısız!');
    }
  };

  return (
    <div className="container">
      <h1>Kayıt Ol</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">Ad:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="email">Soyad:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Şifre:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default Register;
