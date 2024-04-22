// Nhập module css
import style from "./Navbar.module.css";

// Lấy dữ liệu từ file json
import navBarData from "../../data/navBar.json";

// Nhập các component
import NavBarItem from "./NavBarItem";

const NavBar = () => {
  return (
    <div>
      <div className={style.header}>
        <h1 className={style.title}>Booking Website</h1>
        <div className={style["button-container"]}>
          <div className={style.button}>Register</div>
          <div className={style.button}>Login</div>
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
