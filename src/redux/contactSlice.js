import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './initialState';
import {
  addContact,
  fetchContacts,
  deleteContact,
  patchContact,
} from './operations';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: InitialState,

  extraReducers: builder => {
    builder
      // fetchContacts
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // addContact
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // deleteContact
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // patchContact
      .addCase(patchContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(patchContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.contacts.findIndex(
          task => task.id === action.payload.id
        );
        const id = action.payload.id;
        const name = action.payload.name;
        const number = action.payload.number;
        state.contacts.splice(index, 1, { id, name, number });
        state.error = null;
      })
      .addCase(patchContact.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const contactsReducer = contactSlice.reducer;
