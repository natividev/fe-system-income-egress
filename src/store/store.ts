import { stateSliceBitacora } from "@/features/bitacora/bitacora";
import { stateSliceProyecto } from "@/features/protects/proyects";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    stateProyects: stateSliceProyecto.reducer,
    stateBitacora: stateSliceBitacora.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
