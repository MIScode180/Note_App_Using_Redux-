import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api_URL = "https://68e4c5db8e116898997ccb32.mockapi.io/Todo-App"

const initialState = {
  items: [],
    status: 'idle',
    error: null,
  }



// Fetch Data through Thunk 

export const  fetchNotes = createAsyncThunk('notes/fetchNotes' , async() => {
    const respone = await axios.get(api_URL);
    return respone.data
    });


    // Thunk to add note
export const addNote = createAsyncThunk('notes/addNote', async (note) => {
  const response = await axios.post(api_URL, note);
  return response.data;
});


// Thunk to update note
export const updateNote = createAsyncThunk('notes/updateNote', async (note) => {
  const response = await axios.put(`${api_URL}/${note.id}`, note);
  return response.data;
});

// Thunk to delete note
export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  await axios.delete(`${api_URL}/${id}`);
  return id; // Return id so we can remove from state
});



const noteSlice = createSlice({
    name:'notes',
    initialState : initialState, 
    reducers: {},
    extraReducers: (builder) => {
    builder
      // fetchNotes
      .addCase(fetchNotes.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // addNote
      .addCase(addNote.pending, (state) => { state.status = 'loading'; })
      .addCase(addNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // updateNote
      .addCase(updateNote.pending, (state) => { state.status = 'loading'; })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // deleteNote
      .addCase(deleteNote.pending, (state) => { state.status = 'loading'; })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(note => note.id !== action.payload);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default noteSlice.reducer;
