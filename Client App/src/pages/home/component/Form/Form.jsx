// Nhập module css
import style from "./Form.module.css";

const Form = () => {
  return (
    <div className={style["form-container"]}>
      <div className={style.container}>
        <h2 className={style.title}>Save time, save money!</h2>
        <p className={style.text}>
          Sign up and we'll send the best deals to you
        </p>
        <form className={style["form-content"]}>
          <input
            type="text"
            placeholder="Your Email"
            className={style["form-input"]}
          />
          <button className={style.btn}>Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
