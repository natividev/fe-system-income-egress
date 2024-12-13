import { Proyecto } from "@/interface/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Proyecto = {};

export const stateSliceProyecto = createSlice({
  name: "proyects",
  initialState,
  reducers: {
    setState: (state: Proyecto, action: PayloadAction<Proyecto>) =>
      action.payload,
    resetState: (state: Proyecto, action: PayloadAction<Proyecto>) =>
      action.payload,
  },
});

export const { setState, resetState } = stateSliceProyecto.actions;

export default stateSliceProyecto.reducer;
