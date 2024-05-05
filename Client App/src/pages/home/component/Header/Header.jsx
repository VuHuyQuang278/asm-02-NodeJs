// Nhập module css
import style from "./Header.module.css";
// Nhập component
import FormSearch from "./FormSearch";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={style.header}>
      <h2 className={style.text}>A lifetime of discounts? It's Genius</h2>
      <p className={style.text}>
        Get rewarded for your travels - unlock instant saving of 10% or more
        with a free account
      </p>
      <Link to={"/login"} className={style["btn-register"]}>
        Sign in / Register
      </Link>
      <FormSearch />
    </div>
  );
};

export default Header;
