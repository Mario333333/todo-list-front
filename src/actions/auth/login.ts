"use server";
import { API_URL } from "@/utils/constants";

import { signIn } from "@/auth.config"; 

interface User {
  email: string,
  password: string
}

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {


    return "CredentialsSignin";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password, redirect: false, }, );

    return { ok: true };
  } catch (error) {
   
    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
};





//server action return to client then avoid sen password to client

export const dataBaseLogin = async (
  email: string,
  password: string
):Promise<any  > => {
  try {
   
    
    const response  = await fetch(`${API_URL}auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  email, password }),
    });
    const user = await response.json()

    
    return {
      ok: true,
      user: user,
      message: "Logged",
    };
  } catch (error) {

    
    return {
      ok: false,
      message: "User does not exist",
    };
  }
};
