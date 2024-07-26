"use client";
import {} from "@/actions";
import { postSubTask } from "@/actions/subtask/post-subtask";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoAddSharp, IoCloseOutline } from "react-icons/io5";


type FormInputs = {
  subTask: string;
};

export const CreateSubTaskForm = ({ idTask }: { idTask: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // function called when the info is valid
    const { subTask } = data;
    postSubTask(subTask, idTask);
    setIsVisible(false);
  };

  return (
    <>
      <button
        className="flex flex-row items-center justify-start text-gray-600"
        onClick={() => {
          setIsVisible(true);
        }}
      >
        {" "}
        <span className="mr-2">
          <IoAddSharp />
        </span>{" "}
        Agregar Subtarea
      </button>

      {isVisible && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fade-in bg-white absolute bottom-0 flex flex-col justify-center  p-20"
        >
          <IoCloseOutline
            className="absolute top-5 right-5 cursor-pointer"
            size={50}
            onClick={() => {
              setIsVisible(false);
            }}
          />
          <label htmlFor="subTask">Sub Tarea</label>
          <input
            type="text"
            className="px-5 py-2 border bg-gray-200 rounded mb-5"
            {...register("subTask", { required: true })}
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
