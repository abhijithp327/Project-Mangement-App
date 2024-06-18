import { BASE_URL } from "../appConfig";
import axios from "axios";

export const getSingleUser = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/get_single_user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};