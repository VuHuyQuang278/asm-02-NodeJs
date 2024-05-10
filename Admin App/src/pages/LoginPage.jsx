import useInput from "../hooks/use-input";

import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"), "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.length > 8, "");

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

    const res = await fetch("http://localhost:5000/admin/login", {
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
    console.log(data);

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
    <>
      <h2 className="mt-20 mb-8 text-center text-2xl font-medium">Login</h2>
      <form className="mx-auto w-1/3" onSubmit={formSubmissionHandler}>
        <input
          type="email"
          className="w-3/4 mx-14 px-4 py-2 border-2"
          placeholder="Email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="mx-14 text-red-600 pt-1 pb-2">
            Please enter a valid email.
          </p>
        )}
        <input
          type="password"
          className="w-3/4 mx-14 px-4 py-2 border-2 mt-4"
          placeholder="Password"
          onChange={passwordChangedHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
        />
        {passwordInputHasError && (
          <p className="mx-14 text-red-600 pt-1">
            Password must be more than 8 characters.
          </p>
        )}
        <button
          type="submit"
          className="w-3/4 mx-14 px-4 py-2 border-2 my-8 bg-blue-700 text-slate-200 font-medium"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
