import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from '@testing-library/user-event'


test("renders add user form", () => {
  render(<App />);
  const elements = screen.getAllByText(/Добавить пользователя/i);
  expect(elements.length).toBe(2);
});

test("renders user list", () => {
  render(<App />);
  const elements = screen.getAllByText(/Список пользователей/i);
  expect(elements.length).toBe(1);
});

test("form input and alerts", async () => {
  render(<App />);
  const user = userEvent.setup()

  const submit = screen.getByText("ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ")

  await user.click(submit)
  const alertNameReq = screen.getByText('Введите имя');
  expect(alertNameReq).toBeInTheDocument()
  const alertUNameReq = screen.getByText('Введите юзернейм');
  expect(alertUNameReq).toBeInTheDocument()
  const alertEmailReq = screen.getByText('Введите email');
  expect(alertEmailReq).toBeInTheDocument()

  const nameTextBox = screen.getByPlaceholderText('Ваше имя');
  await user.type(nameTextBox, "123456789101234567891012345678910123456789101234567891012345678910");
  expect(nameTextBox).toHaveValue("123456789101234567891012345678910123456789101234567891012345678910");
  await user.click(submit)
  const alertNameTooLong = screen.getByText("Имя не должно превышать 50 символов");
  expect(alertNameTooLong).toBeInTheDocument()
  
  const usernameTextBox = screen.getByPlaceholderText('Имя пользователя');
  await user.type(usernameTextBox, "1");
  expect(usernameTextBox).toHaveValue("1");
  await user.click(submit)
  const alertUNameTooShort = screen.getByText("Юзернейм должен быть от 2 до 50 символов");
  expect(alertUNameTooShort).toBeInTheDocument()
  await userEvent.clear(usernameTextBox)
  await user.type(usernameTextBox, "123456789101234567891012345678910123456789101234567891012345678910");
  expect(usernameTextBox).toHaveValue("123456789101234567891012345678910123456789101234567891012345678910");
  await user.click(submit)
  const alertUNameTooLong = screen.getByText("Юзернейм должен быть от 2 до 50 символов");
  expect(alertUNameTooLong).toBeInTheDocument()
  await userEvent.clear(usernameTextBox)
  await user.type(usernameTextBox, "asddas asdasdas");
  expect(usernameTextBox).toHaveValue("asddas asdasdas");
  await user.click(submit)
  const alertUNameWrong = screen.getByText('Только символы английского алфавита, цифры, символы "_" и "-"');
  expect(alertUNameWrong).toBeInTheDocument()

  const emailTextBox= screen.getByPlaceholderText('john@acme.com');
  await user.type(emailTextBox, "johnacme.com");
  expect(emailTextBox).toHaveValue("johnacme.com");
  await user.click(submit)
  const alertEmailFormat = screen.getByText("Неверный формат email");
  expect(alertEmailFormat).toBeInTheDocument()

  
});

