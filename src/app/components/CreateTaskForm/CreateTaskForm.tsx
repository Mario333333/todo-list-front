"use client";
import { postTask } from "@/actions";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";



type FormInputs = {
  task: string;
};

export const CreateTaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // function called when the info is valid
    const { task } = data;
    postTask(task);
    setIsVisible(false);
    
  };

  return (
    <>
      <button
        disabled={false}
        type="submit"
        className="btn-primary transition-all my-20"
        onClick={() => {
          setIsVisible(true);
        }}
      >
        Crear tarea
      </button>
      {isVisible && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white absolute z-11 top-1/2 left-1/2  flex flex-col justify-center  p-20"
        >
          <IoCloseOutline
            className="absolute top-5 right-5 cursor-pointer"
            size={50}
            onClick={() => {
              setIsVisible(false);
            }}
          />
          <label htmlFor="task">Nueva tarea</label>
          <input
            type="text"
            className="px-5 py-2 border bg-gray-200 rounded mb-5"
            {...register("task", { required: true })}
          />
          <button
            disabled={false}
            type="submit"
            className="btn-primary transition-all mt-5"
          >
            Crear
          </button>
        </form>
      )}
    </>
  );
};
