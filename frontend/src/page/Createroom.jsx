import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoom = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const roomName = document.getElementById('roomName').value;
    const password1 = document.getElementById('pass1').value;
    const password2 = document.getElementById('pass2').value;

    if (!roomName || !password1 || !password2) {
      alert('Please fill in all fields');
      return;
    }

    if (password1 !== password2) {
      alert('Passwords do not match');
      return;
    }

    const password = password1;
    const createdBy = props.userLogged._id;
    const formData = { roomName,createdBy, password };

    try {
      const response = await fetch('http://localhost:4000/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create room!');
      }

      const responseData = await response.json();
      if(responseData){
        console.log(responseData);
        navigate('/dashboard');
      }
      else {
        console.log('Something went wrong:', responseData.message);
        navigate('/CreateRoom');
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
            <label className="form-label" htmlFor="roomName">roomName</label>
            <input type="text" id="roomName" className="form-control" required />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="pass1">Password</label>
            <input type="password" id="pass1" className="form-control" required />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="pass2">Confirm Password</label>
            <input type="password" id="pass2" className="form-control" required />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-block col-4" onClick={handleSubmit}>CreateRoom</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
