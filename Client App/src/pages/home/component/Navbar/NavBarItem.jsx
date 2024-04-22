// Nhập module css
import style from "./NavBarItem.module.css";

const NavBarItem = (props) => {
  return (
    <li className={`${style["nav-item"]} ${props.active && style.active}`}>
      <div className={`fa ${props.icon}`}></div>

      <div>{props.type}</div>
      <div>{props.active}</div>
    </li>
  );
};

export default NavBarItem;
