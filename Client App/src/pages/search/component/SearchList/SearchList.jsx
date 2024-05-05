// Lấy dữ liệu từ file json
// import searchData from "../../data/search.json";

// Nhập các component
import SearchListItem from "./SearchListItem";

const SearchList = ({ hotelData }) => {
  console.log(hotelData);
  return (
    <div>
      {/* Kiểm tra có dữ liệu không nếu có thì hiển thị  */}
      {hotelData &&
        hotelData.map((item) => (
          <SearchListItem
            key={item._id}
            name={item.name}
            distance={item.distance}
            hotelId={item._id}
            description={item.desc}
            price={item.cheapestPrice}
            rate={item.rating}
            image_url={item.photos[0]}
          />
        ))}
    </div>
  );
};

export default SearchList;
