import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.png";

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

      <div className="header__user">
        <span className="header__username">Terrence Tegegne</span>
        <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
      </div>
    </header>
  );
}

export default Header;
