import React from "react";
import { BlogUser } from "../store/users";
import GetUsersButton from "./GetUsersButton";
import UserCard from "./UserCard";
import { Grid, Stack, Typography } from "@mui/material";
import GetUsersErrorMessage from "./GetUsersErrorMessage";

interface UserListProps {
  users: BlogUser[];
  isLoading: boolean;
}

function UserList(props: UserListProps) {
  return (
    <>
      <Stack
        margin="40px 0 20px 0"
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h3">Список пользователей</Typography>
        <GetUsersButton />
      </Stack>
      <GetUsersErrorMessage />
      <Grid data-testid="users-container" container spacing={2}>
        {props.users.map((user: BlogUser) => {
          return <UserCard user={user} key={user.id}></UserCard>;
        })}
      </Grid>
    </>
  );
}

export default UserList;
