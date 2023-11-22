//const BASE_URL = "https://10.1.11.1:8000";
//const BASE_URL = "https://10.1.11.234:8000";
//const BASE_URL = "https://127.0.0.1:8000";
//const BASE_URL = "https://192.168.0.0:8000";
//const BASE_URL = "https://localhost:8000";
//const BASE_URL = "https://172.20.10.3:8000";
const BASE_URL = "https://fd36-81-82-240-0.ngrok-free.app";

export const loginUser = async (email, password) => {
  console.log("start");
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
    console.log("halfweg");

    if (response.ok) {
      console.log("Login successful");
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      console.log("Registration successful");
    } else {
      console.error("Registration failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
};
