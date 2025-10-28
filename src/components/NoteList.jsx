import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, deleteNote } from '../features/noteSlice';

export default function NotesList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.notes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNotes());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  if (status === 'loading') return <p>Loading notes...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
      <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Notes</h2>
      {items.length === 0 && <p>No notes available.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((note) => (
          <div key={note.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title">{note.title}</h3>
              <p className="mb-2">{note.content}</p>
              <small className="text-gray-500">
                Updated at: {new Date(note.updatedAt).toLocaleString()}
              </small>
              <div className="card-actions mt-4">
                <button
                  onClick={() => handleDelete(note.id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
