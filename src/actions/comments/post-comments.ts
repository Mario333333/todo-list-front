"use server";

import { auth } from "@/auth.config";
import { API_URL } from "@/utils/constants";
import { revalidateTag } from "next/cache";

export const postComment = async (comment: string, idTask: string) => {


  const session = await auth();

  const authorization: string = session?.user?.token || "";

  const author: string = session?.user.userExist?.id || "";

  try {
    const url = `${API_URL}comment/${idTask}`;
    console.log(url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify({ author, comment }),
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
