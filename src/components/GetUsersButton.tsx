import React from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { useDispatch, useSelector } from "react-redux";
import { getUserFetch } from "../store/users";

import { RootState } from "../store/index";

function GetUsersButton() {
  const dispatch = useDispatch();

  const refreshHandler = () => {
    dispatch(getUserFetch());
  };

  const isLoading: boolean = useSelector(
    (state: RootState) => state.users.isLoading,
  );

  return (
    <>
      {!isLoading && (
        <Button
          variant="contained"
          onClick={refreshHandler}
          startIcon={<CloudDownloadIcon />}
        >
          ЗАГРУЗИТЬ С СЕРВЕРА
        </Button>
      )}
      {isLoading && (
        <LoadingButton loading variant="contained">
          ЗАГРУЗИТЬ С СЕРВЕРА
        </LoadingButton>
      )}
    </>
  );
}

export default GetUsersButton;
