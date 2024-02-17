import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = (props) => {
    const [myRooms, setMyRooms] = useState([{ createDate: "None", createdBy: "None", password: "None", roomName: "None", _id: "None" }])
    const navigate = useNavigate();
    const getMyRooms = async (event) => {
        event.preventDefault();
        const createdBy = props.userLogged._id;
        const formData = { createdBy };
        try {
            const response = await fetch('http://localhost:4000/myrooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            const responseData = await response.json();
            setMyRooms(responseData);
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:4000/logout');
            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            console.log(responseData.message);
            props.setUserLogged(null);
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    return (
        <div className='container mt-5 center'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Dashboard</h5>
                    <p className="card-text">Welcome {props.userLogged.firstName}</p>
                    <Link className="btn btn-primary m-2" to="/Joinroom">Join Room</Link>
                    <Link className="btn btn-primary m-2" to="/Createroom">Create Room</Link>
                    <button className="btn btn-success m-2" onClick={getMyRooms}>My Rooms</button>
                    <button className="btn btn-danger m-2" onClick={logout}>Logout</button>
                </div>
            </div>

            <div className="card" id="roolistcard">
                <div className="card-body">
                    <h5 className="card-title">My Rooms</h5>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Room Id</th>
                                    <th scope="col">Room Name</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Created On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myRooms.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item._id}</td>
                                        <td>{item.roomName}</td>
                                        <td>{item.password}</td>
                                        <td>{item.createDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
