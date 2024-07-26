"use client";
import { authenticate } from "@/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { IoAlertOutline } from "react-icons/io5";
import { LoginButton } from "./LoginButton";
import { useEffect } from "react";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

 

  useEffect(() => {
    if ( state === 'Success' ) {
      window.location.replace('/tasks');
    }

  },[state]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Password</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <LoginButton />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <>
            <IoAlertOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Invalid credentials</p>
          </>
        )}
      </div>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Create new account
      </Link>
    </form>
  );
};
