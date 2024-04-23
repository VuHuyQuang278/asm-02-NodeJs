import style from "./LoginPage.module.css";
import useInput from "../../hooks/use-input";

const LoginForm = () => {
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

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid) {
      return;
    }

    if (!enteredPasswordIsValid) {
      return;
    }

    resetEmailInput();
    resetPasswordInput();
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
