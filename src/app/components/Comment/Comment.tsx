"use client";
import { updateComment } from "@/actions";
import { deleteComment } from "@/actions/comments/deleteComment";
import type { Comment as CoomentInterface } from "@/utils/interfaces";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
interface Props {
  comment: CoomentInterface;
}

export const Comment = ({ comment }: Props) => {
  const [editComment, setEditComment] = useState(false);
  const [value, setValue] = useState(comment.comment);
  const deleteCurrentComment = async () => {
    await deleteComment(comment._id);
  };

  const updateCurrentComment = async () => {
    await updateComment(value, comment._id);
    setEditComment(false);
  };
  return (
    <div className="flex flex-col justify-between  bg-white rounded mb-3 py-2 px-2">
      {!editComment ? (
        <h2 className="font-medium my-2 text-gray-600"> {comment.comment}</h2>
      ) : (
        <div className="flex flex-col my-2">
          <input
            type="text"
            className="block py-1 pl-1 border border-gray-300 bg-gray-200 rounded font-medium my-2  text-gray-600 mr-3 shadow focus:outline-none "
            value={value}
            onChange={(event) => {
              setValue(event?.target?.value);
            }}
          />
          <button
            disabled={false}
            type="submit"
            className="bg-green-400 text-white p-1 rounded shadow w-[100px]"
            onClick={() => {
              updateCurrentComment();
            }}
          >
            Actualizar
          </button>
        </div>
      )}

      <div className="flex flex-row  items-center">
        <CiEdit
          className="mr-2"
          onClick={() => {
            setEditComment(true);
          }}
        />
        <IoTrashOutline
          onClick={deleteCurrentComment}
          className="mr-2 text-red-500"
        />
      </div>
    </div>
  );
};
