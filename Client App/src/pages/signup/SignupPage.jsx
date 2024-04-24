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

// export const action = async ({ request }) => {
//   const dataForm = await request.formData();
//   const userData = {
//     userName: dataForm.get("userName"),
//     password: dataForm.get("password"),
//     fullName: dataForm.get("fullName"),
//     phoneNumber: dataForm.get("phoneNumber"),
//     email: dataForm.get("email"),
//   };

//   const res = await fetch("http://localhost:5000/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//     mode: "cors",
//   });

//   if (!res.ok) throw new Error("Something went wrong!");

// };
