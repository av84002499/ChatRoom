import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Room = (props) => {
    const [chats, setChats] = useState([{ "_id": "65ce63581d0fd4b6bb115df7", "chat": "Hlo Ankit", "roomID": "65ce5ce27427dfd61ae58a14", "userId": "65ce594603a890d0c1969315", "createDate": "2024-02-15T19:17:44.413Z" }])
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const chat = document.getElementById('message').value;


        if (!chat) {
            alert('Please fill in all fields');
            return;
        }
        const roomID = props.roomLogged._id;
        const userName = props.userLogged.firstName;
        const userId = props.userLogged._id;


        const formData = { chat, roomID, userName, userId };

        try {
            const response = await fetch('http://localhost:4000/addchat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const responseData = await response.json();
            if (responseData) {
                document.getElementById('message').value = '';
                // console.log(responseData);
            }
            else {
                console.log('Something went wrong:', responseData);
                navigate('/login');
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
            alert(error.message);
        }
    };


    useEffect(() => {
        const fetchChats = async () => {
            const roomID = props.roomLogged._id;
            const formData = { roomID };
            try {
                const response = await fetch('http://localhost:4000/chats', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch chats');
                }
                const data = await response.json();
                setChats(data); // Update state with fetched chats
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };
        
        document.getElementById('chatpage').scrollTop = 99999999;

        const intervalId = setInterval(fetchChats, 100); // Fetch chats every 2 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [props.roomLogged._id]);

    return (
        <>
            <div className="container vw-100 vh-100">
                <div className='h-100 p-5'>
                    <div className="card h-100 bg-secondary">
                        <div className="card-header bg-success text-white">
                            <strong>{props.roomLogged.roomName}</strong>
                        </div>
                        <div id='chatpage' className="card-body p-4 overflow-auto">
                            {chats.map((chat) => (
                                <>
                                
                                <p className="rounded-bottom rounded-end w-75 p-1 px-3 bg-white"><span className='text-danger fs-6'>{chat.userName}</span><br/>{chat.chat}<br/><span className='text-muted text-end'>{chat.createDate}</span></p>
                                </>
                            ))}
                        </div>
                        <div className="card-footer border-0 mb-4">
                        <form>
                            <div className='row '>
                                <div className='col-10 ms-auto'>
                                    <input id="message" type='text ' className='form-control rounded-pill p-2 px-4' placeholder='Type a message...' required />
                                </div>
                                <div className='col-1 me-auto'>
                                    <button type='submit' className='btn btn-success rounded-pill text-align-center p-2 px-4' onClick={handleSubmit}>Send</button>
                                </div>
                                </div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Room;