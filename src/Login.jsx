import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here, if needed
    console.log('Login attempted with email:', email, 'password:', password);

    // For now, it will directly navigate to the dashboard after clicking sign-in
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <h1 className="login-title">Expense Tracker</h1>
        <p className="login-subtitle">Manage your expenses effortlessly</p>
      </header>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
      <footer className="login-footer">
        <p>Don't have an account? <Link to="/signup">Sign up now</Link></p>
      </footer>
    </div>
  );
};

export default Login;
