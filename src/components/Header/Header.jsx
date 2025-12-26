import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatarFallback from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  addClothesButtonClick,
  weatherData,
  isLoggedIn,
  onSignUp,
  onLogIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const displayName = currentUser?.name || "User";
  const displayAvatar = currentUser?.avatar || avatarFallback;

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
            type="button"
            className="header__add-clothes-button"
            onClick={addClothesButtonClick}
          >
            + Add Clothes
          </button>

          <Link to="/profile" className="header__user">
            <span className="header__username">{displayName}</span>
            <img
              className="header__avatar"
              src={displayAvatar}
              alt={`${displayName} avatar`}
            />
          </Link>
        </>
      ) : (
        <div className="header__auth">
          <button className="header__auth-button" onClick={onSignUp}>
            Sign Up
          </button>
          <button className="header__auth-button" onClick={onLogIn}>
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
