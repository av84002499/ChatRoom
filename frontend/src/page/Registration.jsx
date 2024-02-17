import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regDate, setRegDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    try {
      const response = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          regDate,
        }),
      });
  
      if (!response.ok) {
        // Handle error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register user');
      }
  
      // Registration successful, navigate to the login page
      navigate('/login');
    } catch (error) {
      // Handle error
      console.error('Registration failed:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='container-sm'>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerFirstName">
              First Name
            </label>
            <input
              type="text"
              id="registerFirstName"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerLastName">
              Last Name
            </label>
            <input
              type="text"
              id="registerLastName"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerEmail">
              Email
            </label>
            <input
              type="email"
              id="registerEmail"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerPassword">
              Password
            </label>
            <input
              type="password"
              id="registerPassword"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerRegDate">
              Registration Date
            </label>
            <input
              type="date"
              id="registerRegDate"
              className="form-control"
              value={regDate}
              onChange={(e) => setRegDate(e.target.value)}
              required
            />
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-block col-4">
              Registration
            </button>
          </div>
          <div className="text-center">
            <p>
              Already a member? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
