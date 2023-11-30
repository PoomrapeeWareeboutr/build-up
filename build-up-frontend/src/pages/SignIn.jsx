import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/register_and_sign_in/register-and-sign-in.scss';
import Cookies from 'universal-cookie';

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const SignIn = async (e) => {
    e.preventDefault();
    const account = { username, password };
    try {
      const response = await fetch('http://localhost:8080/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(account),
      });
      if (response.status === 200) {
        const responseJson = await response.json();

        const cookies = new Cookies();
        cookies.set('loginToken', responseJson.data);
        cookies.set('username', username);

        navigate('/');
        console.log('Sign-in successful');
      } else {
        // Handle sign-in errors here
        console.error('Sign-in failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={'auth-container'}>
      <div className="register">
        <h2 className="form-title">Sign In</h2>
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
          <button type="submit" onClick={SignIn}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
