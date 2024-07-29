'use client'
import { logOut } from "@/actions";

export const LogOutButton = () => {
  return (
    <button
      disabled={false}
      type="submit"
      className="bg-gray-500 p-2 rounded-md text-white transition-all shadow-2xl"
      onClick={async() => {
        await logOut();
        window.location.replace("/");
      }}
    >
      Cerrar Sesion
    </button>
  );
};
