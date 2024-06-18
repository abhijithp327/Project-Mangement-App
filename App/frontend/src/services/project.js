import axios from 'axios';
import { BASE_URL } from '../appConfig';

export const createProject = async (project, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/projects/create_project`, project, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProject = (id, project) => axios.put(`${BASE_URL}/projects/update_project/${id}`, project);

export const getProject = (id) => axios.get(`${BASE_URL}/projects/get_single_project/${id}`);

export const getAllProjects = () => axios.get(`${BASE_URL}/projects/get_all_projects`);

export const deleteProject = (id) => axios.delete(`${BASE_URL}/projects/delete_project/${id}`)

export const getSingleUser = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/projects/get_user_projects`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};