import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/noteSlice'; // Matches your slice's filename and export

const store = configureStore({
  reducer: {
    notes: noteReducer,  
  },
});

export default store;
