import { configureStore } from '@reduxjs/toolkit';

import contactsReducer from './contactsSlice.js';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
