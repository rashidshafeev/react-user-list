import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { BlogUser, getUserFetch } from "../store/users";

import AddUserForm from "../components/AddUserForm";
import UserList from "../components/UserList";

import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

function MainLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFetch());
  }, [dispatch]);

  const users: BlogUser[] = useSelector(
    (state: RootState) => state.users.users,
  );
  const usersIsLoading: boolean = useSelector(
    (state: RootState) => state.users.isLoading,
  );

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Пользователи
      </Typography>
      <AddUserForm></AddUserForm>
      {users && <UserList users={users} isLoading={usersIsLoading}></UserList>}
    </Container>
  );
}

export default MainLayout;
