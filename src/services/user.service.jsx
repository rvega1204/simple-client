import axios from "axios";

const baseApiUrl = 'http://localhost:4000';

export const createUser = async (payload) => {
    const createUserEndpoint = `${baseApiUrl}/v1/user`;
    const { data: apiResponse } = await axios.post(`${createUserEndpoint}`, payload);
    return apiResponse;
};

export const editUser = async (userId, payload) => {
    const editUserEndpoint = `${baseApiUrl}/v1/user/${userId}`;
    const { data: apiResponse } = await axios.put(`${editUserEndpoint}`, payload);
    return apiResponse;
};

export const getUser = async (userId) => {
    const getUserEndpoint = `${baseApiUrl}/v1/user/${userId}`;
    const { data: apiResponse } = await axios.get(`${getUserEndpoint}`);
    return apiResponse;
};

export const getAllUsers = async () => {
    const getAllUsersEndpoint = `${baseApiUrl}/v1/user/all`;
    const { data: apiResponse } = await axios.get(`${getAllUsersEndpoint}`);
    return apiResponse;
};

export const getErrorMessage = (err) => {
    const {
        data: {
            errors: { body }
        },
    } = err?.response;

    const message = body[0]?.message
    return message[0].toUpperCase() + message.substring(1);
};