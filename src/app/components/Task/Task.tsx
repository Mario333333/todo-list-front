"use client";
import { deleteTask } from "@/actions/tasks/deleteTask";
import type { Task as TaskInterface } from "@/utils/interfaces";
import clsx from "clsx";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GoIssueClosed } from "react-icons/go";
import { IoCloseCircleSharp, IoTrashOutline } from "react-icons/io5";
import { SubTask } from "../SubTask/SubTask";
import { CreateSubTaskForm } from "../CreateSubTaskForm/CreateSubTaskForm";
import { Comment } from "@/app/components/Comment/Comment";
import { CreateCommentForm } from "../CreateCommentForm/CreateCommentForm";
import { closeTask, openTask, updateTask } from "@/actions";
import { MdOutlinePending } from "react-icons/md";
interface Props {
  task: TaskInterface;
}

export const Task = ({ task }: Props) => {
  const [edittask, setEditTask] = useState(false);
  const [value, setValue] = useState(task.task);
  const deleteCurrentTask = async () => {
    await deleteTask(task._id);
  };

  const closeCurrentTask = async () => {
    await closeTask(task._id);
  };
  const openCurrentTask = async () => {
    await openTask(task._id);
  };
  
  const updateCurrentTask = async () => {
    await updateTask(value, task._id);
    setEditTask(false)
  };

  return (
    <div
      key={task._id}
      className={clsx(
        "rounded-md overflow fade-in bg-slate-200 p-5 border relative z-0 shadow-2xl"
      )}
    >
      <span
        className={clsx("rounded-md  fade-inborder text-white p-1 shadow font-bold", {
          "bg-yellow-400": !task.isClosed,
          "bg-green-400": task.isClosed,
        })}
      >
        {!task.isClosed ? "Pendiente" : "Completada"}
      </span>

      {!edittask ? (
        <h2 className="font-bold my-2 text-gray-600">{task.task}</h2>
      ) : (
        <div className="flex items-center my-2">
          <input
            type="text"
            className="inline py-1 pl-1 border border-gray-300 bg-gray-200 rounded font-medium my-2 text-gray-600 mr-3 shadow focus:outline-none "
            value={value}
            onChange={(event)=>{
              
              setValue(event?.target?.value)
            }}
          />
          <button
            disabled={false}
            type="submit"
            className="bg-green-400 text-white p-1 rounded shadow"
            onClick={() => {
              updateCurrentTask();
            }}
            
          >
            Actualizar
          </button>
        </div>
      )}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row  items-center">
          <CiEdit
            className="mr-2"
            onClick={() => {
              setEditTask(true);
            }}
          />
          <IoTrashOutline
            className="mr-2 text-red-500"
            onClick={deleteCurrentTask}
          />
          {!task.isClosed ? (
            <MdOutlinePending
              className=" mr-2 text-yellow-400"
              onClick={closeCurrentTask}
            />
          ) : (
            <GoIssueClosed className="mr-2 text-green-400" onClick={openCurrentTask} />
          )}
        </div>
      </div>

      <div className="py-5 grid grid-cols-1  md:grid-cols-2 gap-10 mb-10  bottom-0">
        {task.subTasks.length > 0 && (
          <div>
            <h2 className=" text-gray-600 font-medium">Sub Tareas</h2>
            {task.subTasks.map((subtask, index) => (
              <SubTask key={index} subtask={subtask} taskId={task._id} />
            ))}
          </div>
        )}

        {task.comments.length > 0 && (
          <div>
            <h2 className=" text-gray-600 font-medium">Comentarios</h2>
            {task.comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
        )}
      </div>
     
      <div className="absolute bottom-0 mb-3">
      <CreateCommentForm idTask={task._id} />

{!task.isClosed && <CreateSubTaskForm idTask={task._id} />}
      </div>
      
    </div>
  );
};
