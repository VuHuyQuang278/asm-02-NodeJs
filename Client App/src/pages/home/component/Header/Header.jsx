// Nhập module css
import style from "./Header.module.css";
// Nhập component
import FormSearch from "./FormSearch";

const Header = () => {
  return (
    <div className={style.header}>
      <h2 className={style.text}>A lifetime of discounts? It's Genius</h2>
      <p className={style.text}>
        Get rewarded for your travels - unlock instant saving of 10% or more
        with a free account
      </p>
      <p className={style["btn-register"]}>Sign in / Register</p>
      <FormSearch />
    </div>
  );
};

export default Header;
