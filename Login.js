import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Untuk indikator loading
  const [error, setError] = useState(''); // Untuk menyimpan pesan error

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Jika ada token di localStorage, anggap user sudah login
      onLogin(true);
    }
  }, [onLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mulai loading saat submit
    setError(''); // Reset pesan error sebelum submit

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username, // Gunakan username sebagai email
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.userId); // Simpan token di localStorage

        // Login berhasil, panggil onLogin
        onLogin(true);

      } else {
        // Jika login gagal, tampilkan pesan error
        setError(data.message || 'Username atau password salah');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {error && <p className="error">{error}</p>} {/* Tampilkan pesan error */}
      </form>
    </div>
  );
};

export default Login;
