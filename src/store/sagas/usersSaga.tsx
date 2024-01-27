import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { delay, put, takeEvery } from "redux-saga/effects";
import { getUserSuccess, getUserFail, addUser, addUserSuccess, addUserFail } from "../users";

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
  console.log('ADDUSER')
  console.log(action.payload)
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
  } catch (error) {
    console.log(error)
    yield put(addUserFail())
  }
}

function* usersSaga() {
    yield takeEvery('users/getUserFetch', workGetUserFetch)
    yield takeEvery('users/addUser', workAddUser)
}

export default usersSaga


