import axios from 'axios';
import { BASE_URL } from '../appConfig';

export const login = async (credentials) => {
    try {

        const response = await axios.post(`${BASE_URL}/users/login_user`, credentials);
        console.log("response data", response.data.result.token);
        const { token } = response.data.result;
        console.log("token", token);
        localStorage.setItem('token', token);
        return response.data;
    } catch (error) {

        throw error;

    }
};

export const logout = () => localStorage.removeItem('token');

export const register = (user) => axios.post(`${BASE_URL}/users/register_user`, user);

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};