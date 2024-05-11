import style from "./SignupPage.module.css";
import useInput from "../../hooks/use-input";
import { Form } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredFullName,
    isValid: enteredFullNameIsValid,
    hasError: fullNameInputHasError,
    valueChangeHandler: fullNameChangedHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: resetFullNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.length > 8);

  const regex = /^[0-9]{10}$/;

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangedHandler,
    inputBlurHandler: phonedBlurHandler,
    reset: resetPhoneInput,
  } = useInput((value) => regex.test(value));

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    if (!enteredPasswordIsValid) {
      return;
    }

    if (!enteredFullNameIsValid) {
      return;
    }

    if (!enteredPhoneIsValid) {
      return;
    }

    if (!enteredEmailIsValid) {
      return;
    }

    const userData = {
      userName: enteredName,
      password: enteredPassword,
      fullName: enteredFullName,
      phoneNumber: enteredPhone,
      email: enteredEmail,
    };

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      mode: "cors",
    });

    if (!res.ok) throw new Error("Something went wrong!");

    const data = await res.json();

    alert(data.message);

    resetNameInput();
    resetPasswordInput();
    resetFullNameInput();
    resetPhoneInput();
    resetEmailInput();

    navigate("/");
  };

  return (
    <Form
      action="/signup"
      method="POST"
      className={style.form}
      onSubmit={formSubmissionHandler}
    >
      <input
        type="text"
        name="userName"
        className={style.input}
        placeholder="User Name"
        onChange={nameChangedHandler}
        onBlur={nameBlurHandler}
        value={enteredName}
      />
      {nameInputHasError && (
        <p className={style["err-mess"]}>Name must not be empty.</p>
      )}
      <input
        type="password"
        name="password"
        className={style.input}
        placeholder="Password"
        onChange={passwordChangedHandler}
        onBlur={passwordBlurHandler}
        value={enteredPassword}
      />
      {passwordInputHasError && (
        <p className={style["err-mess"]}>
          Password must be more than 8 characters.
        </p>
      )}
      <input
        type="text"
        name="fullName"
        className={style.input}
        placeholder="Full Name"
        onChange={fullNameChangedHandler}
        onBlur={fullNameBlurHandler}
        value={enteredFullName}
      />
      {fullNameInputHasError && (
        <p className={style["err-mess"]}>Full name must not be empty.</p>
      )}
      <input
        type="text"
        name="phoneNumber"
        className={style.input}
        placeholder="Phone Number"
        onChange={phoneChangedHandler}
        onBlur={phonedBlurHandler}
        value={enteredPhone}
      />
      {phoneInputHasError && (
        <p className={style["err-mess"]}>Please enter a valid phone.</p>
      )}
      <input
        type="email"
        name="email"
        className={style.input}
        placeholder="Email"
        onChange={emailChangedHandler}
        onBlur={emailBlurHandler}
        value={enteredEmail}
      />
      {emailInputHasError && (
        <p className={style["err-mess"]}>Please enter a valid email.</p>
      )}
      <button type="submit" className={style.btn}>
        Create Account
      </button>
    </Form>
  );
};

export default SignupForm;
