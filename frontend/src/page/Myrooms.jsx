import React, { useState } from 'react';

const Myrooms = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState('');

    // Function to fetch rooms data
    const fetchRooms = async () => {
        try {
            const response = await fetch('http://localhost:4000/myrooms');
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    // Function to handle form submission and post new room
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/myrooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newRoom }),
            });
            if (response.ok) {
                fetchRooms(); // Fetch rooms again to update the list
                setNewRoom(''); // Clear input field
            } else {
                console.error('Failed to add room');
            }
        } catch (error) {
            console.error('Error adding room:', error);
        }
    };

    // Fetch rooms data when component mounts
    React.useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div>
            <div className="card">
                <h5 className="card-header">Featured</h5>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={newRoom}
                            onChange={(e) => setNewRoom(e.target.value)}
                            placeholder="Enter room name"
                        />
                        <button type="submit">Add Room</button>
                    </form>
                    <ul>
                        {rooms.map((room, index) => (
                            <li key={index}>{room.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Myrooms;
