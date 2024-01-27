import React from 'react'
import { BlogUser, deleteUser } from '../store/users';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, CardHeader, Divider, Grid, colors,CardContent,Card, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';

interface UserCardProps {
    user: BlogUser,
  }
function UserCard(props : UserCardProps) {

    const colorsArray = [
        colors.red[500], colors.green[500], colors.blue[500], colors.cyan[500]
    ]
    
const dispatch = useDispatch()

const deleteUserHandler = () => {
    dispatch(deleteUser(props.user.id))
}

  return (
    <Grid item xs={6} sm={3}>

    
    <Card>
        <CardHeader
        onClick={deleteUserHandler}
        avatar={
            <Avatar variant="rounded" sx={{ bgcolor: colorsArray[Math.floor(Math.random()*4)]  }} aria-label="recipe">
              {props.user.name.slice(0,1)}
            </Avatar>
          }
          title={props.user.name}
        >
        
        </CardHeader>
        
        <Divider />
        <CardContent>
        <Stack
        direction="row">
            <LinkIcon/>
            <Typography
            color="text.secondary"
            margin="0 0 0 10px">
            {props.user.username}
            </Typography>
        </Stack>
        <Stack
        direction="row">
            <EmailIcon />
            <Typography
            color="text.secondary"
            margin="0 0 0 10px">
            {props.user.email}
            </Typography>
        </Stack>
        
        </CardContent>
        
    </Card>
    </Grid>
  )
}

export default UserCard