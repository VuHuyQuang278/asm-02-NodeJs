import style from "./LoginPage.module.css";
import useInput from "../../hooks/use-input";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.length > 8);

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid) {
      return;
    }

    if (!enteredPasswordIsValid) {
      return;
    }

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      mode: "cors",
    });

    if (res.status === 401) {
      return;
    }

    if (!res.ok) throw new Error("Something went wrong!");

    const data = await res.json();

    const user = data.user;

    // Gửi hành động đến redux store
    dispatch(authActions.ON_LOGIN());
    dispatch(authActions.setCurrentUser(user));

    // Thông báo đăng nhập thành công
    alert(data.message);

    resetEmailInput();
    resetPasswordInput();

    navigate("/");
  };

  return (
    <form className={style.form} onSubmit={formSubmissionHandler}>
      <input
        type="email"
        className={style.input}
        placeholder="Email"
        onChange={emailChangedHandler}
        onBlur={emailBlurHandler}
        value={enteredEmail}
      />
      {emailInputHasError && (
        <p className={style["err-mess"]}>Please enter a valid email.</p>
      )}
      <input
        type="password"
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
      <button type="submit" className={style.btn}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
