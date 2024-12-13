import { Bitacora } from "@/interface/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Bitacora = {};

export const stateSliceBitacora = createSlice({
  name: "bitacora",
  initialState,
  reducers: {
    setState: (state: Bitacora, action: PayloadAction<Bitacora>) =>
      action.payload,
    resetState: (state: Bitacora, action: PayloadAction<Bitacora>) =>
      action.payload,
  },
});

export const { setState, resetState } = stateSliceBitacora.actions;

export default stateSliceBitacora.reducer;
