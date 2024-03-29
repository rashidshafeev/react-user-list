import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import Button from "@mui/material/Button";
import { RootState } from "../store/index";

import "./AddUserForm.css";

import { useDispatch, useSelector } from "react-redux";
import { addUser, usernameTaken, emailTaken } from "../store/users";
import {
  Card,
  Typography,
  Grid,
  Stack,
  CardContent,
  CardHeader,
  Divider,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import AddUserErrorMessage from "./AddUserErrorMessage";

interface Values {
  name: string;
  username: string;
  email: string;
}



function AddUserForm() {

  

  const dispatch = useDispatch();
  const addIsLoading: boolean = useSelector(
    (state: RootState) => state.users.addIsLoading,
  );
  const usernameTakenBool: boolean = useSelector(
    (state: RootState) => state.users.usernameTaken,
  );
  const emailTakenBool: boolean = useSelector(
    (state: RootState) => state.users.emailTaken,
  );

  const AddUserSchema = Yup.object().shape({
    name: Yup.string().max(50, "Имя не должно превышать 50 символов").required("Введите имя").trim(),
    username: Yup.string()
      .min(2, "Юзернейм должен быть от 2 до 50 символов")
      .max(50, "Юзернейм должен быть от 2 до 50 символов")
      .matches(/^[A-Za-z0-9_-][A-Za-z0-9_-]*$/, 'Только символы английского алфавита, цифры, символы "_" и "-"')
      .test("username", "Это имя пользователя уже занято", function (username) {
        dispatch(usernameTaken(username!))
        return !usernameTakenBool;
    })
      .required("Введите юзернейм")
      .trim(),
    email: Yup.string().email("Неверный формат email").required("Введите email").test("email", "Этот почтовый адрес уже занят", function (email) {
      dispatch(emailTaken(email))
      return !emailTakenBool;
  }).trim(),
  });

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
        }}
        validationSchema={AddUserSchema}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>,
        ) => {
          dispatch(addUser(values));
          resetForm({
            values: {
              name: "",
              username: "",
              email: "",
            },
          });
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Добавить пользователя"></CardHeader>
              <Divider></Divider>
              <AddUserErrorMessage />
              <CardContent>
                <Form>
                  <Stack direction="column">
                    <Typography variant="h5" gutterBottom></Typography>
                    <label htmlFor="name">Имя пользователя</label>
                    <Field
                      className="form-input"
                      id="name"
                      name="name"
                      placeholder="Ваше имя"
                      
                    />
                    <ErrorMessage
                      name="name"
                      render={(msg) => <Alert severity="warning">{msg}</Alert>}
                    />

                    <label htmlFor="username">Юзернейм</label>
                    <Field
                      className="form-input"
                      id="username"
                      name="username"
                      placeholder="Имя пользователя"
                    />
                    <ErrorMessage
                      name="username"
                      render={(msg) => <Alert severity="warning">{msg}</Alert>}
                    />
                    <label htmlFor="email">Email</label>
                    <Field
                      className="form-input"
                      id="email"
                      name="email"
                      placeholder="john@acme.com"
                      type="email"
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => <Alert severity="warning">{msg}</Alert>}
                    />

                    {!addIsLoading && (
                      <Button
                        size="large"
                        variant="contained"
                        color="success"
                        type="submit"
                        sx={{
                          width: "60%",
                          margin: "20px 0 0 0",
                          alignSelf: "flex-end",
                        }}
                        startIcon={<AddIcon />}
                      >
                        ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ
                      </Button>
                    )}
                    {addIsLoading && (
                      <LoadingButton
                        loading
                        size="large"
                        variant="contained"
                        sx={{
                          width: "60%",
                          margin: "20px 0 0 0",
                          alignSelf: "flex-end",
                        }}
                      >
                        ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ
                      </LoadingButton>
                    )}
                  </Stack>
                </Form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Formik>
    </>
  );
}

export default AddUserForm;
