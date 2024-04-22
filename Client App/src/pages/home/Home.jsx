// // Nhập module css
import style from "./Home.module.css";
// Nhập các component
import Navbar from "./component/Navbar/Navbar";
import Header from "./component/Header/Header";
import Body from "./component/Body/Body";
import Form from "./component/Form/Form";
import Footer from "./component/Footer/Footer";

const Home = () => {
  return (
    <div className={style["home-container"]}>
      <div className={style.home}>
        <div className={style["header-container"]}>
          <Navbar />
          <Header />
        </div>
      </div>
      <div className={style.body}>
        <Body />
      </div>
      <Form />
      <Footer />
    </div>
  );
};

export default Home;
