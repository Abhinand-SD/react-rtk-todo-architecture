import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todoSlice';

// configureStore is the standard RTK method to create a Redux store.
// It automatically sets up the Redux DevTools extension and necessary middleware (like Redux Thunk).
export const store = configureStore({
  reducer: {
    // We assign our slice reducer to the 'todos' key in the global state object.
    todos: todoReducer,
  },
});
