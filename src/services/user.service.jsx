import axios from "axios";

// Base URL for the API
const baseApiUrl = 'http://localhost:4000/v1';

/**
 * Creates a new user by sending a POST request to the API.
 * 
 * @param {Object} payload - The user data to be sent to the API.
 * @returns {Promise<Object>} - The API response containing the created user's details.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const createUser = async (payload) => {
    const createUserEndpoint = `${baseApiUrl}/user`;
    const { data: apiResponse } = await axios.post(`${createUserEndpoint}`, payload);
    return apiResponse;
};

/**
 * Updates an existing user's details by sending a PUT request to the API.
 * 
 * @param {string} userId - The ID of the user to be updated.
 * @param {Object} payload - The updated user data.
 * @returns {Promise<Object>} - The API response containing the updated user's details.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const editUser = async (userId, payload) => {
    const editUserEndpoint = `${baseApiUrl}/user/${userId}`;
    const { data: apiResponse } = await axios.put(`${editUserEndpoint}`, payload);
    return apiResponse;
};

/**
 * Retrieves a specific user's details by sending a GET request to the API.
 * 
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<Object>} - The API response containing the user's details.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const getUser = async (userId) => {
    const getUserEndpoint = `${baseApiUrl}/user/${userId}`;
    const { data: apiResponse } = await axios.get(getUserEndpoint);
    return apiResponse;
};

/**
 * Retrieves all users by sending a GET request to the API.
 * 
 * @returns {Promise<Object[]>} - The API response containing a list of all users.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const getAllUsers = async () => {
    const getAllUsersEndpoint = `${baseApiUrl}/user/all`;
    const { data: apiResponse } = await axios.get(getAllUsersEndpoint);
    return apiResponse;
};

/**
 * Deletes a user by their ID.
 * 
 * This function sends a request to the API to delete a user based on the provided user ID.
 *
 * @param {string} userId - The unique identifier of the user to be deleted.
 * @returns {Object} - The response from the API after attempting to delete the user.
 * @throws Will throw an error if the request fails.
 */
export const deleteUser = async (userId) => {
    const deleteUserEndpoint = `${baseApiUrl}/user/${userId}`;
    const { data: apiResponse } = await axios.delete(deleteUserEndpoint);
    return apiResponse;
};

/**
 * Extracts and formats the error message from an API error response.
 * 
 * @param {Object} err - The error object from the API response.
 * @returns {string} - The formatted error message.
 * @throws {TypeError} - Throws a TypeError if the error object does not have the expected structure.
 */
export const getErrorMessage = (err) => {
    const {
        data: {
            errors: { body }
        },
    } = err?.response;

    // Extract the first message from the error body
    const message = body[0]?.message;

    // Format the message to start with an uppercase letter
    return message[0].toUpperCase() + message.substring(1);
};