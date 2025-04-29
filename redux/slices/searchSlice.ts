import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  page: number;
}

const initialState: SearchState = {
  query: "",
  page: 1,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetSearch(state) {
      state.query = "";
      state.page = 1;
    },
  },
});

export const { setQuery, setPage, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
