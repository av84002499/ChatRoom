import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password1 = document.getElementById('pass1').value;
    const password2 = document.getElementById('pass2').value;

    if (!email || !password1 || !password2) {
      alert('Please fill in all fields');
      return;
    }

    if (password1 !== password2) {
      alert('Passwords do not match');
      return;
    }

    const formData = { email, password1, password2 };

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const responseData = await response.json();
      if(responseData.result){
        console.log(responseData.message);
        props.setUserLogged(responseData.user);
        navigate('/dashboard');
      }
      else {
        console.log('Something went wrong:', responseData.message);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="container-sm">
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="loginName">Email</label>
            <input type="email" id="email" className="form-control" required />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="loginPassword">Password</label>
            <input type="password" id="pass1" className="form-control" required />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="loginPassword">Confirm Password</label>
            <input type="password" id="pass2" className="form-control" required />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-block col-4" onClick={handleSubmit}>Login</button>
          </div>
        </form>
        <div className="text-center">
          <p>Not a member? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
