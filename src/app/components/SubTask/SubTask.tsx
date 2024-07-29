"use client";
import {
  closeSubtask,
  deleteSubTask,
  openSubTask,
  updateSubTask,
} from "@/actions";
import { useErrorStore } from "@/store";
import type { SubTasks } from "@/utils/interfaces";
import clsx from "clsx";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GoIssueClosed } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
interface Props {
  subtask: SubTasks;
  taskId: string;
}

export const SubTask = ({ subtask, taskId }: Props) => {
  const setError = useErrorStore((state) => state.setError);

  const [editSubTask, setEditSubTask] = useState(false);
  const [value, setValue] = useState(subtask.subtask);
  const deleteCurrentSubTask = async () => {
    await deleteSubTask(subtask._id);
  };

  const closeSubTask = async () => {
    await closeSubtask(subtask._id);
  };

  const openCurrentSubTask = async () => {
    const response = await openSubTask(subtask._id, taskId);
console.log(response);

    if (response && !response.ok) {
      setError("No se pudo abrir actual subtarea")
    }
  };

  const updateCurrentSubTask = async () => {
    await updateSubTask(value, subtask._id);
    setEditSubTask(false);
  };

  return (
    <div className="flex flex-col justify-between  bg-white rounded mb-3 py-2 px-2 shadow-xl">
      <div>
      <span
        className={clsx("rounded-md  text-white px-1  mr-2 inline", {
          "bg-yellow-400": !subtask.isClosed,
          "bg-green-400": subtask.isClosed,
        })}
      >
        {!subtask.isClosed ? "Pendiente" : "Completada"}
      </span></div>
      {!editSubTask ? (
        <h2 className="font-medium my-2  text-gray-600">{subtask.subtask}</h2>
      ) : (
        <div className="flex flex-col  my-2">
          <input
            type="text"
            className=" py-1 pl-1 border border-gray-300 bg-gray-200 rounded font-medium my-2 text-gray-600 mr-3 shadow focus:outline-none "
            value={value}
            onChange={(event) => {
              setValue(event?.target?.value);
            }}
          />
          <button
            disabled={false}
            type="submit"
            className="bg-green-400 text-white p-1 rounded shadow  w-[100px]"
            onClick={() => {
              updateCurrentSubTask();
            }}
          >
            Actualizar
          </button>
        </div>
      )}

      <div className="flex flex-row  items-center ">
        <CiEdit
          className="mr-2"
          onClick={() => {
            setEditSubTask(true);
          }}
        />

        <IoTrashOutline
          onClick={deleteCurrentSubTask}
          className="mr-2 text-red-500"
        />

        <button
          className="flex justify-center items-center"
          onClick={() => {
            if (!subtask.isClosed) {
              closeSubTask();
            } else {
              openCurrentSubTask();
            }
          }}
        >
          <span className="mr-2">
            {!subtask.isClosed ? "Completar" : "Abrir"}
          </span>
          {!subtask.isClosed ? (
            <MdOutlinePending
              className={clsx(" mr-2", {
                "text-yellow-400": !subtask.isClosed,
                "text-green-400": subtask.isClosed,
              })}
            />
          ) : (
            <GoIssueClosed className="mr-2 text-green-400" />
          )}
        </button>
      </div>
    </div>
  );
};
