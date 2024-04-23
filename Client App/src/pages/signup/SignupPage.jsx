import NavBar from "../home/component/Navbar/Navbar";
import Footer from "../home/component/Footer/Footer";
import SignupForm from "./SignupForm";

import style from "./SignupPage.module.css";

const SignupPage = () => {
  return (
    <>
      <div className={style.header}>
        <div className={style["nav-container"]}>
          <NavBar />
        </div>
      </div>
      <div className={style.main}>
        <h3 className={style.title}>Sign Up</h3>
        <SignupForm />
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
