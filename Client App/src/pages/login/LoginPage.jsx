import NavBar from "../home/component/Navbar/Navbar";
import Footer from "../home/component/Footer/Footer";
import LoginForm from "./LoginForm";

import style from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <>
      <div className={style.header}>
        <div className={style["nav-container"]}>
          <NavBar />
        </div>
      </div>
      <div className={style.main}>
        <h3 className={style.title}>Login</h3>
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
