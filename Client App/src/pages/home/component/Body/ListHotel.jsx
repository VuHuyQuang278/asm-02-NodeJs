// Nhập module css
import style from "./ListHotel.module.css";
// Lấy dữ liệu từ file json
import data from "../../data/hotel_list.json";

const ListHotel = () => {
  // Hàm xử lý sự kiện click vào tên khách sạn
  const onClickHandler = (e) => {
    e.preventDefault();
    // Chuyển đến trang Detail
    window.location.replace("./Detail");
  };

  return (
    <div className={style["hotel-container"]}>
      <h2 className={style.title}>Homes guests love</h2>
      <div className={style["hotel-content"]}>
        {data.map((item, i) => (
          <div key={i} className={style["img-content"]}>
            <img
              src={item.image_url}
              alt="Image Hotel"
              className={style["image-hotel"]}
            />
            <div className={style.text}>
              <p
                className={style["hotel-name"]}
                // Thêm sự kiện click
                onClick={onClickHandler}
              >
                {item.name}
              </p>
              <p className={style["city"]}>{item.city}</p>
              <p className={style["price"]}>Starting from ${item.price}</p>
              <p className={style["type"]}>
                <span className={style["rate"]}>{item.rate}</span> &nbsp;
                {item.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHotel;
