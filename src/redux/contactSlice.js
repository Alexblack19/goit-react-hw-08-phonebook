import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './initialState';
import { addContact, fetchContacts, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: InitialState,

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.rejected, handleRejected)

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      });
  },

  //* При нижче наведеному (закоментованому) коді з'являється попередження. Caution: The object notation for `createSlice.extraReducers` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice

  // extraReducers: {
  //   [fetchContacts.pending]: handlePending,
  //   [fetchContacts.rejected]: handleRejected,

  //   [addContact.pending]: handlePending,
  //   [addContact.rejected]: handleRejected,

  //   [deleteContact.pending]: handlePending,
  //   [deleteContact.rejected]: handleRejected,

  //   [fetchContacts.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.contacts = action.payload;
  //   },

  //   [addContact.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.contacts.push(action.payload);
  //   },

  //   [deleteContact.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     const index = state.contacts.findIndex(
  //       contact => contact.id === action.payload.id
  //     );
  //     state.contacts.splice(index, 1);
  //   },
  // },
});

export const contactsReducer = contactSlice.reducer;
