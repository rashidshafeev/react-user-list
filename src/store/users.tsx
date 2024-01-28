import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4, validate } from "uuid";

export interface BlogUserExternal {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface BlogUser {
  id: string;
  external_id: number;
  name: string;
  username: string;
  email: string;
}

// export interface BlogUsers {
//     [userId: string]: BlogUser,
// }

interface usersState {
  users: BlogUser[];
  isLoading: boolean;
  error: string;
  addIsLoading: boolean;
  addError: string;
}

const initialState: usersState = {
  users: [],
  isLoading: false,
  error: "",
  addIsLoading: false,
  addError: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserFetch: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action: PayloadAction<BlogUserExternal[]>) => {
      action.payload.forEach((user) => {
        if (!state.users.find((u) => u.external_id === user.id)) {
          state.users.push({
            id: uuidv4(),
            external_id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          });
        }
      });
      state.isLoading = false;
    },
    getUserFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    addUser: (
      state,
      action: PayloadAction<{ name: string; username: string; email: string }>,
    ) => {
      state.addIsLoading = true;
    },
    addUserSuccess: (
      state,
      action: PayloadAction<{ name: string; username: string; email: string }>,
    ) => {
      state.users.push({
        id: uuidv4(),
        external_id: 0,
        ...action.payload,
      });
      state.addIsLoading = false;
    },
    addUserFail: (state, action: PayloadAction<string>) => {
      state.addIsLoading = false;
      state.addError = action.payload;
    },
    clearAddError: (state) => {
      state.addError = "";
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.users.splice(
        state.users.findIndex((u) => u.id === action.payload),
        1,
      );
    },
  },
});

export const {
  deleteUser,
  clearAddError,
  addUser,
  getUserFetch,
  getUserSuccess,
  getUserFail,
  clearError,
  addUserFail,
  addUserSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;
