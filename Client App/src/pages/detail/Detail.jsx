// Nhập module css
import style from "./Detail.module.css";

// Nhập các component
import NavBar from "../home/component/Navbar/Navbar";
import Form from "../home/component/Form/Form";
import Footer from "../home/component/Footer/Footer";
import InforHotel from "./component/InforlHotel";
import ImgHotel from "./component/ImgHotel";
import Description from "./component/Description";

// Lấy dữ liệu từ file json
import detailData from "./data/detail.json";

const Detail = () => {
  return (
    <div>
      <div className={style["nav-container"]}>
        <div className={style.nav}>
          <NavBar />
        </div>
      </div>
      {detailData && (
        <div>
          <InforHotel
            name={detailData.name}
            address={detailData.address}
            distance={detailData.distance}
            price={detailData.price}
          />
          <ImgHotel photos={detailData.photos} />
          <Description
            title={detailData.title}
            description={detailData.description}
            nine_night_price={detailData.nine_night_price}
          />
        </div>
      )}
      <Form />
      <Footer />
    </div>
  );
};

export default Detail;
