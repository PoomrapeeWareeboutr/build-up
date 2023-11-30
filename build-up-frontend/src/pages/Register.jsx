import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/register_and_sign_in/register-and-sign-in.scss';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setCPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const account = { username, password };
    if (password !== c_password) {
      console.log('Confirm password much match the password.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(account),
      });
      if (response.status === 201) {
        navigate('/sign-in');
        console.log('Register successful!');
      } else {
        // Handle registration errors here
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error', error);
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className={'auth-container'}>
      <div className="register">
        <h2 className="form-title">Register</h2>
        <form method="POST" className="register-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="c_password"
              placeholder="confirm your password"
              value={c_password}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
