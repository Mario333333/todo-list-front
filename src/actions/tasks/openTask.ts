"use server";

import { auth } from "@/auth.config";
import { API_URL } from "@/utils/constants";
import { revalidateTag } from "next/cache";

export const openTask = async (idTask: string) => {
  const session = await auth();

  const authorization: string = session?.user?.token || "";


  try {
    const url = `${API_URL}task/${idTask}/open`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      }
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }


 
  } catch (error) {
    console.log(error);

    throw new Error("error");
  }
  revalidateTag('tasks') 

};
