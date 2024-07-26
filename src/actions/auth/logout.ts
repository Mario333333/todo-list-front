"use server";

import { signOut } from "@/auth.config";

// we can send any data to the server for that reason call this function passin no data
export const logout = async () => {
  await signOut();
};
