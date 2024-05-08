import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHotel,
  faShop,
  faTruck,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RootLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandle = (event) => {
    dispatch(authActions.ON_LOGOUT());
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/6 border-2 border-collapse">
        <h2 className="text-center mx-auto py-3 font-medium text-lg text-blue-800">
          Admin Page
        </h2>
        <hr className="border-t-4 mb-4" />
        <div className="ml-8 text-blue-800">
          <h3>MAIN</h3>
          <ul className="ml-4 my-3">
            <li>
              <Link to={"/"} className="flex items-center justify-start gap-3">
                <FontAwesomeIcon icon={faBars} />
                <p>Dashboard</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-8 text-blue-800">
          <h3>LISTS</h3>
          <ul className="ml-4 my-3">
            <li>
              <Link
                to={"/"}
                className="flex items-center justify-start gap-3 pb-2"
              >
                <FontAwesomeIcon icon={faUser} />
                <p>Users</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/hotel"}
                className="flex items-center justify-start gap-3 pb-2"
              >
                <FontAwesomeIcon icon={faHotel} />
                <p>Hotels</p>
              </Link>
            </li>
            <li className="flex items-center justify-start gap-3 pb-2">
              <FontAwesomeIcon icon={faShop} />
              <p>Rooms</p>
            </li>
            <li className="flex items-center justify-start gap-3 pb-2">
              <FontAwesomeIcon icon={faTruck} />
              <p>Transactions</p>
            </li>
          </ul>
        </div>
        <div className="ml-8 text-blue-800">
          <h3>NEW</h3>
          <ul className="ml-4 my-3">
            <li className="flex items-center justify-start gap-3 pb-2">
              <FontAwesomeIcon icon={faHotel} />
              <p>New Hotel</p>
            </li>
            <li className="flex items-center justify-start gap-3 pb-2">
              <FontAwesomeIcon icon={faShop} />
              <p>New Room</p>
            </li>
          </ul>
        </div>
        <div className="ml-8 text-blue-800">
          <h3>USER</h3>
          <ul className="ml-4 my-3">
            <li>
              <button
                onClick={logoutHandle}
                className="flex items-center justify-start gap-3 pb-2"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <p>Logout</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-4/5">
        <div className="block h-14 border-b-2"></div>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
