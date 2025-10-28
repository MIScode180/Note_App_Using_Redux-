import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../features/noteSlice";

export default function NoteForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    dispatch(addNote({ title, content, updatedAt: new Date().toISOString() }));
    setTitle("");
    setContent("");
  };

  return (
    <>
      <h2 className="text-accent flex justify-center my-5  py-7 text-2xl ">Redux Note</h2>
    <form className="flex justify-center my-7  py-7 gap-5 " onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Title"
        className="input input-success"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea placeholder="Content" className="textarea textarea-success" value={content}
        onChange={(e) => setContent(e.target.value)}
        required></textarea>
        <button type="submit" className="btn btn-success rounded-2xl m-5">Add Note</button>
    </form>
    </>
  );
}
