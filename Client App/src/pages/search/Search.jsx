// Nhập module css
import style from "./Search.module.css";

// Nhập các component
import SearchList from "./component/SearchList/SearchList";
import SearchPopup from "./component/SearchPopup/SearchPopup";
import NavBar from "../home/component/Navbar/Navbar";
import Footer from "../home/component/Footer/Footer";

const Search = () => {
  return (
    <div>
      <div className={style["nav-container"]}>
        <div className={style.nav}>
          <NavBar />
        </div>
      </div>
      <div className={style["search-container"]}>
        <SearchPopup />
        <SearchList />
      </div>
      <Footer />
    </div>
  );
};

export default Search;
