import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataItem } from "../../types";
import { mockFetchData } from "../../data";

export const fetchData = createAsyncThunk("data/fetchData", async (): Promise<DataItem[]> => {
  return mockFetchData();
});

interface DataState {
  status: string;
  error?: any;
  data: DataItem[];
}

const initialState: DataState = {
  status: "idle",
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = "loading";
      state.error = undefined;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = "ready";
      state.data = action.payload;
    });
  },
});

export default dataSlice.reducer;
