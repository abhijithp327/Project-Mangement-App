import express from 'express';
import { getAllUsers, getSingleUser, loginUser, registerUser } from '../controllers/userController.js';
import isAuthenticate from '../middleware/isAuthenticate.js';


const router = express.Router();

// register a user 
router.post('/register_user', registerUser);

// LOGIN USER 
router.post('/login_user', loginUser);

// get single user
router.get('/get_single_user', isAuthenticate, getSingleUser);

// GET all users
router.get('/get_all_users', getAllUsers)



export default router;