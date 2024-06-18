import express from 'express';
import { createProject, deleteProject, getAllProjects, getSingleProject, getUserProjects, updateProject } from '../controllers/projectController.js';
import isAuthenticate from '../middleware/isAuthenticate.js';


const router = express.Router();

// create project
router.post('/create_project', isAuthenticate, createProject);

// update project
router.put('/update_project/:projectId', isAuthenticate, updateProject);

// get single project
router.get('/get_single_project/:projectId', isAuthenticate, getSingleProject);

// get all projects
router.get('/get_all_projects', getAllProjects);

// get all projects by user id 
router.get('/get_user_projects', isAuthenticate, getUserProjects);

// delete project
router.delete('/delete_project/:projectId', isAuthenticate, deleteProject);


export default router;