import React from "react";
import { clearError } from "../store/users";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { Alert } from "@mui/material";

function GetUsersErrorMessage() {
  const dispatch = useDispatch();
  const error: string = useSelector((state: RootState) => state.users.error);
  return (
    <>
      {error && (
        <Alert
          severity="warning"
          onClose={() => {
            dispatch(clearError());
          }}
        >
          {error}
        </Alert>
      )}
    </>
  );
}

export default GetUsersErrorMessage;
