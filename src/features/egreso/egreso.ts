import { Egreso } from "@/interface/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Egreso = {};

export const stateSliceEgreso = createSlice({
  name: "egreso",
  initialState,
  reducers: {
    setStateEgreso: (state: Egreso, action: PayloadAction<Egreso>) =>
      action.payload,
    resetStateEgrego: (state: Egreso, action: PayloadAction<Egreso>) =>
      action.payload,
  },
});

export const { setStateEgreso, resetStateEgrego } = stateSliceEgreso.actions;

export default stateSliceEgreso.reducer;
