// Nhập module css
import style from "./Navbar.module.css";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../../store/auth";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

// Lấy dữ liệu từ file json
import navBarData from "../../data/navBar.json";

// Nhập các component
import NavBarItem from "./NavBarItem";

const NavBar = () => {
  // Khởi tạo state
  const [userEmail, setUserEmail] = useState();

  const dispatch = useDispatch();

  // Lấy state từ reduc store
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isLogin) {
      setUserEmail(user.email);
    }
  }, [isLogin, user]);

  const logoutHandle = () => {
    dispatch(authActions.ON_LOGOUT());
  };

  return (
    <div>
      <div className={style.header}>
        <Link to={"/"} className={style.title}>
          Booking Website
        </Link>
        <div className={style["button-container"]}>
          {isLogin && <div className={style["user-email"]}>{userEmail}</div>}
          {isLogin ? (
            <>
              <Link to={"/"} className={style.button}>
                Transactions
              </Link>
              <button onClick={logoutHandle} className={style.button}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/signup"} className={style.button}>
                Sign Up
              </Link>
              <Link to={"/login"} className={style.button}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      <ul className={style.nav}>
        {/* Kiểm tra có dữ liệu không, nếu có thì hiển thị  */}
        {navBarData &&
          navBarData.map((item, i) => (
            <NavBarItem
              key={i}
              type={item.type}
              icon={item.icon}
              active={item.active}
            />
          ))}
      </ul>
    </div>
  );
};

export default NavBar;
