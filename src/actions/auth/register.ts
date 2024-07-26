"use server";

import { API_URL } from "@/utils/constants";

//server action return to client then avoid sen password to client

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = fetch(`${API_URL}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return {
      ok: true,
      user: user,
      message: "created user",
    };
  } catch (error) {
    return {
      ok: false,
      message: "we can't create the user",
    };
  }
};
