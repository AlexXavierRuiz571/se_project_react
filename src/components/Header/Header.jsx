import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatarFallback from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  addClothesButtonClick,
  weatherData,
  isLoggedIn,
  currentUser,
  onSignUp,
  onLogIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const city = weatherData?.city || "loading...";

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="App Logo" />
      </Link>

      <div className="header__date-location">
        {currentDate}, {city}
      </div>

      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            onClick={addClothesButtonClick}
            type="button"
            className="header__add-clothes-button"
          >
            + Add Clothes
          </button>

          <Link to="/profile" className="header__user">
            <span className="header__username">
              {currentUser?.name || "User"}
            </span>
            <img
              className="header__avatar"
              src={currentUser?.avatar || avatarFallback}
              alt="User avatar"
            />
          </Link>
        </>
      ) : (
        <div className="header__auth">
          <button className="header__auth-btn" onClick={onSignUp}>
            Sign Up
          </button>
          <button className="header__auth-btn" onClick={onLogIn}>
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
