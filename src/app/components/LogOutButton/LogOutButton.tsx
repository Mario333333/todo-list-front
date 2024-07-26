'use client'
import { logOut } from "@/actions";

export const LogOutButton = () => {
  return (
    <button
      disabled={false}
      type="submit"
      className="btn-primary transition-all my-20 mx-10"
      onClick={() => {
        logOut();
      }}
    >
      Cerrar Sesion
    </button>
  );
};
