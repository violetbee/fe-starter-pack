import { User } from "@/hooks/useUser";
import { createSlice } from "@reduxjs/toolkit";

interface SliceType {
  user: User | null;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  } as SliceType,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
