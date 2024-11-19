/**
 * Unit test for the `createUser` function.
 * This test simulates the behavior of an API using `axios-mock-adapter` to ensure
 * that the function correctly sends a POST request and handles the response.
 */

import test from 'ava'; // Testing framework
import axios from 'axios'; // HTTP client
import MockAdapter from 'axios-mock-adapter'; // Library to mock axios requests
import { createUser, baseApiUrl, editUser, getAllUsers } from '../user.service.jsx'; // Function to test and base API URL

let mock;
let sampleUser;
let updatedDetails;
const expectedId = 1; // The expected ID from the mock response

/**
 * Setup before each test.
 * Initializes sample user data and configures the axios mock adapter.
 */
test.beforeEach(() => {
    // Define sample user payload
    sampleUser = {
        name: 'Joe Doe',
        email: 'joe@gmail.com',
        city: 'New York',
        country: 'USA',
    };

    updatedDetails = {
        name: 'Juan',
        email: 'juan@email.com',
        city: 'Jalisco',
        country: 'Mexito'
    };

    // Create a new mock adapter instance for axios
    mock = new MockAdapter(axios);

    // Mock the POST request to the user creation endpoint
    mock.onPost(`${baseApiUrl}/user`).reply(200, {
        id: expectedId, // Simulate a successful response with an ID
        ...sampleUser, // Include the user data in the response
    });

    // Mock the PUT request to the user update endpoint
    mock.onPut(`${baseApiUrl}/user/${expectedId}`).reply(200, {
        id: expectedId,
        ...updatedDetails
    });

    // Mock the GET request to the users endpoint
    mock.onGet(`${baseApiUrl}/user/all`).reply(200, [
        {
            id: expectedId,
            ...sampleUser,
        },
    ]);
});

/**
 * Cleanup after each test.
 * Restores axios to its original state.
 */
test.afterEach(() => {
    mock.restore(); // Restore axios to its default behavior
});

/**
 * Test case: Verifies that `createUser` successfully sends a POST request
 * and returns the expected user data including an ID.
 * 
 * @param {Object} t - Test context provided by AVA
 */
test('must add a user', async (t) => {
    // Call the function to create a user
    const user = await createUser(sampleUser);

    // Assert that the returned user has the correct ID
    t.is(user.id, expectedId);

    // Assert that the returned user matches the full expected object
    t.deepEqual(user, { id: expectedId, ...sampleUser });
});

/**
 * Test case: Verifies that `editUser` successfully updates an existing user
 * and returns the updated user data including the correct ID.
 * 
 * @param {Object} t - Test context provided by AVA
 */
test('must update a user', async (t) => {
    // Call the function to update the user
    const user = await editUser(expectedId, updatedDetails);

    // Assert that the returned user has the correct ID
    t.is(user.id, expectedId);

    // Assert that the returned user matches the full expected object
    t.deepEqual(user, { id: expectedId, ...updatedDetails });
});

/**
 * Test case: Verifies that `getAllUsers` successfully fetches all users
 * from the API endpoint and returns the expected data structure.
 * 
 * @param {Object} t - Test context provided by AVA for assertions
 */
test('must get all the users', async (t) => {
    // Call the function to get all the users
    const user = await getAllUsers();

    // Assert that the returned user matches the full expected object
    t.deepEqual(user[0], { id: expectedId, ...sampleUser });
});