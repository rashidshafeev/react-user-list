import React from 'react'
import { Formik, FormikProps, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import Button from '@mui/material/Button';
import { RootState } from '../store/index';

import './AddUserForm.css'

import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/users';
import { Card, Typography, Grid, Stack, CardContent, CardHeader, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';

interface Values {
  name: string;
  username: string;
  email: string;
}

function AddUserForm() {

  const dispatch = useDispatch()
  const addIsLoading : boolean = useSelector((state: RootState) => state.users.addIsLoading);

  return (
    <>

      <Formik
        initialValues={{
          name: '',
          username: '',
          email: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          dispatch(addUser(values))
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      > 
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
              title="Добавить пользователя"
              >

              </CardHeader>
              <Divider></Divider>
              <CardContent>
              {/* <Form className='add-user-form'> */}
              <Form>
                <Stack
                direction="column">
                <Typography variant="h5" gutterBottom>
                  
                </Typography>
                <label htmlFor="name">Имя пользователя</label>
                <Field className="form-input" id="name" name="name" placeholder="Ваше имя" />

                <label htmlFor="username">Юзернейм</label>
                <Field className="form-input" id="username" name="username" placeholder="Имя пользователя" />

                <label htmlFor="email">Email</label>
                <Field
                  className="form-input"
                  id="email"
                  name="email"
                  placeholder="john@acme.com"
                  type="email"
                />

                    {!addIsLoading && <Button size="large" variant="contained" color="success" type="submit" sx={{
                      width: "60%", margin: "20px 0 0 0", alignSelf: "flex-end"
                    }}
                    startIcon={<AddIcon/>}>ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ</Button>}   
    {addIsLoading && <LoadingButton loading size="large"  variant="contained" sx={{
                      width: "60%", margin: "20px 0 0 0", alignSelf: "flex-end"
                    }}>ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ</LoadingButton>}  
                </Stack>
              </Form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Formik>
    </>
  )
}

export default AddUserForm