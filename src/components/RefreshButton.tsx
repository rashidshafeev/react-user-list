import React from 'react'
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { useDispatch, useSelector } from 'react-redux';
import { getUserFetch } from '../store/users';

import { RootState } from '../store/index';

function RefreshButton() {

const dispatch = useDispatch()

const refreshHandler = () => {
    dispatch(getUserFetch())
}

const isLoading : boolean = useSelector((state: RootState) => state.users.isLoading);

  return (
    <>
    {!isLoading && <Button variant="contained" onClick={refreshHandler} startIcon={<AutorenewIcon/>}>ОБНОВИТЬ СПИСОК</Button>}   
    {isLoading && <LoadingButton loading  variant="contained" >ОБНОВИТЬ СПИСОК</LoadingButton>}   
    </>
    
  )
}

export default RefreshButton