import { Proyecto } from "@/interface/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: Proyecto = {};

export const stateSlice = createSlice({
  name: "proyects",
  initialState,
  reducers: {
    setState: (state: Proyecto, action: PayloadAction<Proyecto>) =>
      action.payload,
    resetState: (state: Proyecto, action: PayloadAction<Proyecto>) =>
      action.payload,
  },
});

export const { setState, resetState } = stateSlice.actions;

export default stateSlice.reducer;
