// Lấy dữ liệu từ file json
import searchData from "../../data/search.json";

// Nhập các component
import SearchListItem from "./SearchListItem";

const SearchList = () => {
  return (
    <div>
      {/* Kiểm tra có dữ liệu không nếu có thì hiển thị  */}
      {searchData &&
        searchData.map((item, i) => (
          <SearchListItem
            key={i}
            name={item.name}
            distance={item.distance}
            tag={item.tag}
            type={item.type}
            description={item.description}
            free_cancel={item.free_cancel}
            price={item.price}
            rate={item.rate}
            rate_text={item.rate_text}
            image_url={item.image_url}
          />
        ))}
    </div>
  );
};

export default SearchList;
