import React from 'react'
import { clearAddError } from '../store/users'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/index';
import { Alert } from '@mui/material';

function AddUserErrorMessage() {
    
    const dispatch = useDispatch()
    const addError: string = useSelector((state: RootState) => state.users.addError);
  return (
    <>
        {addError && <Alert severity="warning" onClose={() => {dispatch(clearAddError())}}>{addError}</Alert>}
    </>
    
  )
}

export default AddUserErrorMessage