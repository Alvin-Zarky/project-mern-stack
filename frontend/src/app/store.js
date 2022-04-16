import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import noteSlice from '../features/note/noteSlice';
import ticketSlice from '../features/tickets/ticketSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ticket: ticketSlice,
    notes: noteSlice
  },
});
