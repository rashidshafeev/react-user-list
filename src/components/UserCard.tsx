import React from 'react'
import { BlogUser, deleteUser } from '../store/users';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, CardHeader, Divider, Grid, colors, CardContent, Card, Stack, Typography, Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';

interface UserCardProps {
    user: BlogUser,
}


function UserCard(props: UserCardProps) {

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }
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
                <Tooltip title="Кликните чтобы удалить пользователя" placement="top">
                    <div>
                <CardHeader
                    onClick={deleteUserHandler}
                    avatar={
                        <Avatar variant="rounded" sx={{ bgcolor: stringToColor(props.user.name) }} aria-label="recipe">
                            {props.user.name.slice(0, 1)}
                        </Avatar>
                    }
                    title={props.user.name}
                >

                </CardHeader>
                </div>
                </Tooltip>
                

                <Divider />
                <CardContent>
                    <Stack
                        direction="row">
                        <LinkIcon />
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