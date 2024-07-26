"use server";

import { auth } from "@/auth.config";
import { API_URL } from "@/utils/constants";
import { revalidateTag } from "next/cache";

export const updateSubTask = async (subtask: string, idSubTask: string) => {
console.log("data",subtask);

  const session = await auth();

  const authorization: string = session?.user?.token || "";


  try {
    const url = `${API_URL}subtasks/${idSubTask}`;
    console.log(url);
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify({  subtask }),
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
