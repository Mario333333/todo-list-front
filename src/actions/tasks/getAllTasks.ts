"use server";

import { auth } from "@/auth.config";
import { API_URL } from "@/utils/constants";

export const getAllTasks = async () => {
  const session = await auth();

  const authorization: string = session?.user?.token || "";
  const userId: string = session?.user.userExist?.id || "";
  try {
    const url = `${API_URL}task/${userId}/all`;
    const response = await fetch(url, {
      next: { tags: ['tasks'] },
      cache: "no-store",
      headers: {
        Authorization: authorization,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const tasks = await response.json();

    return { tasks };
  } catch (error) {
    console.log(error);

    throw new Error("error");
  }
};
