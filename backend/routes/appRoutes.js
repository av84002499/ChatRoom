import { addNewUser, getUsers, getUser, updateUser, deleteUser, loginUser, logoutUser } from '../controllers/UserControllers.js';
import { addNewRoom, getMyRooms, JoinRoom } from '../controllers/RoomControllers.js';
import { addNewChat, getChatsByRoomId } from '../controllers/ChatControllers.js';
import { logOutExistingUser } from '../middlewares/loginmiddlewares.js'

const routes = (app) => {
    app.route('/users')
        .get(getUsers) //GET Endpoint
        .post(addNewUser); //POST Endpoint

    app.route('/user/:userId')
        .get(getUser)  //Get specific User
        .put(updateUser)   // Update specific User
        .delete(deleteUser);   // delete specific User

        
    app.route('/login')
        .post(logOutExistingUser, loginUser);

    app.route('/logout')
        .get(logoutUser);

    app.route('/rooms')
        .post(addNewRoom); //POST Endpoint

    app.route('/myrooms')
        .post(getMyRooms); //POST Endpoint

    app.route('/joinroom')
        .post(JoinRoom); //POST Endpoint
    
    app.route('/addchat')
        .post(addNewChat) //post Endpoint

    app.route('/chats')
        .post(getChatsByRoomId); //POST Endpoint
}

export default routes;