import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.png";
import menuIcon from "../../assets/menu-bar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link, useNavigate } from "react-router-dom";

function Header({ addClothesButtonClick, weatherData }) {
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  let city;
  if (weatherData && weatherData.city && weatherData.city !== "") {
    city = weatherData.city;
  } else {
    city = "loading...";
  }

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="App Logo" />
      </Link>

      <div className="header__date-location">
        {currentDate}, {city}
      </div>

      <div className="header__temp-switch">
        <ToggleSwitch />
      </div>

      <button
        onClick={addClothesButtonClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>

      <Link to="/profile" className="navigation_menu">
        <button className="navigation__menu" type="button">
          <img src={menuIcon} alt="Menu" className="navigation__menu-icon" />
        </button>
      </Link>

      <Link to="/profile" className="header__user">
        <span className="header__username">Terrence Tegegne</span>
        <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
      </Link>
    </header>
  );
}

export default Header;
