const BASE_URL = "https://9a5c-81-82-240-0.ngrok-free.app";

//  LOGIN
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

//  REGISTER
export const registerUser = async (first_name, last_name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
      }),
    });

    return response;
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

//  LOGOUT
export const logoutUser = async (user_id, refresh_token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        refresh_token,
      }),
    });

    return response;
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

//  REQUEST NEW TOKEN
export const renewToken = async (user_id, refresh_token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        refresh_token,
      }),
    });

    const json = await response.json();
    return json.access_token;
  } catch (error) {
    console.error("Error during registration: ", error);
  }
};

//  GET USER INFORMATION
export const getUserInformation = async (user_id, access_token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return true;
    } else return false;

    return data;
  } catch (error) {
    console.error("Error during registration:", error);
  }
};
