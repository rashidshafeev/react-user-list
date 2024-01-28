import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { delay, put, takeEvery, select } from "redux-saga/effects";
import { getUserSuccess, getUserFail, addUser, addUserSuccess, addUserFail } from "../users";
import { RootState } from "..";
import { BlogUser } from '../users';

const usersState = (state : RootState) => state.users.users

function* workGetUserFetch(): any {
    try {
        const users = yield axios.get(`https://jsonplaceholder.typicode.com/users`)
        console.log(users)
        yield delay(500)
        yield put(getUserSuccess(users.data))
    } catch (error) {
        console.log(error)
        yield put(getUserFail())
    }
}

function* workAddUser(action: PayloadAction<{name: string, username: string, email: string}>): any {
  
  const users = yield select(usersState)

  if (users.find( (user : BlogUser) => user.username.toLowerCase() == action.payload.username.toLowerCase())) {
    console.log('ошибка юзернейм')
    yield put(addUserFail('Пользователь с таким юзернеймом уже существует'))
  } else if (users.find( (user : BlogUser) => user.email.toLowerCase() == action.payload.email.toLowerCase())) {
    console.log('ошибка почта')
    yield put(addUserFail('Пользователь с такой почтой уже существует'))
  } else {
    try {
      const users = yield axios.post('https://jsonplaceholder.typicode.com/posts', {
        name: action.payload.name,
        username: action.payload.username,
        email: action.payload.email,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(users)
      yield delay(500)
      yield put(addUserSuccess(action.payload))
    } catch (error : any) {
      yield put(addUserFail(error.toString()))
    }
  }

  
}

function* usersSaga() {
    yield takeEvery('users/getUserFetch', workGetUserFetch)
    yield takeEvery('users/addUser', workAddUser)
}

export default usersSaga


