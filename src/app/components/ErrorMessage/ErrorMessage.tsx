"use client";
import { useErrorStore } from "@/store";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

type FormInputs = {
  task: string;
};

export const ErrorMessage = () => {
  const error = useErrorStore((state) => state.error);
  const setError = useErrorStore((state) => state.setError);

  return (
    error && (
      <div className="bg-red-400 border border-red-500 text-white absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center  p-10 rounded-xl shadow-xl w-[300px]">
        <IoCloseOutline
          className="absolute top-5 right-5 cursor-pointer"
          size={30}
          onClick={() => {
            setError(null);
          }}
        />
        <p className="">{error}</p>
      </div>
    )
  );
};
