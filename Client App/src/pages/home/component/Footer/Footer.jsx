// Nhập module css
import style from "./Footer.module.css";
// Lấy dữ liệu từ file json
import footerData from "../../data/footer.json";

const Footer = () => {
  return (
    <div className={style["footer-container"]}>
      {footerData.map((data) => {
        return (
          <ul className={style["col-data"]} key={data.col_number}>
            {data.col_values.map((value, i) => {
              return <li key={i}>{value}</li>;
            })}
          </ul>
        );
      })}
    </div>
  );
};

export default Footer;
