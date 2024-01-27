import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import './UserList.css'

import { RootState } from '../store/index';

import { BlogUser, getUserFetch } from '../store/users';
import RefreshButton from './RefreshButton';
import UserCard from './UserCard';
import { Grid, Stack, Typography } from '@mui/material';


interface UserListProps {
  users: BlogUser[],
  isLoading: boolean
}



function UserList(props : UserListProps) {

  return (
    <div>
      <Stack
      margin="40px 0 20px 0"
      direction="row"
      justifyContent="space-between">
        <Typography variant="h3">
        Список пользователей
        </Typography>
      <RefreshButton></RefreshButton>
      </Stack>
      
      <Grid container spacing={2}>
      {
        props.users.map((user : BlogUser) => {
          return (
            <UserCard user={user}></UserCard>
          )
        })
      }
      </Grid>
      
      
     
    </div>

  )
}

export default UserList