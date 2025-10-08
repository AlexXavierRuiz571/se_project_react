import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.png";
import menuIcon from "../../assets/menu-bar.png";

function Header({ addClothesButtonClick, weatherData }) {
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
      <img className="header__logo" src={logo} alt="App Logo" />

      <div className="header__date-location">
        {currentDate}, {city}
      </div>

      <button
        onClick={addClothesButtonClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>

      <button className="header__menu" type="button">
        <img src={menuIcon} alt="Menu" className="header__menu-icon" />
      </button>

      <div className="header__user">
        <span className="header__username">Terrence Tegegne</span>
        <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
      </div>
    </header>
  );
}

export default Header;
