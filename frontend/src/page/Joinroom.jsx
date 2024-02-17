import React from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const roomId = document.getElementById('roomId').value;
    const password = document.getElementById('password').value;

    if (!roomId || !password) {
      alert('Please fill in all fields');
      return;
    }
    const formData = { roomId, password };

    try {
      const response = await fetch('http://localhost:4000/joinroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to join room!');
      }

      const responseData = await response.json();
      if(responseData.result){
        props.setRoomLogged(responseData.result);
        navigate('/Room');
      }
      else {
        console.log('Something went wrong:', responseData.message);
        navigate('/JoinRoom');
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
            <label className="form-label" htmlFor="roomId">roomId</label>
            <input type="text" id="roomId" className="form-control" required />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" required />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-block col-4" onClick={handleSubmit}>JoinRoom</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinRoom;
