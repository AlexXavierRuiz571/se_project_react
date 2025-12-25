import { useEffect, useState, useCallback } from "react";
import {
  getItems,
  addItem as apiAddItem,
  deleteItem as apiDeleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import Profile from "../Profile/Profile";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIKey, getBestCoordinates } from "../../utils/constants";

function App() {
  // ---------- Weather ----------
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
  });

  // track coords and permission state
  const [coords, setCoords] = useState(null);
  const [coordsSource, setCoordsSource] = useState(null);
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false);
  const [coordsFetchError, setCoordsFetchError] = useState(null);
  const [coordsRetryCount, setCoordsRetryCount] = useState(0);

  // ---------- State ----------
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // auth / user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  // ---------- Helpers ----------
  const normalizeItem = (item) => ({
    ...item,
    link: item.link ?? item.imageUrl ?? "",
  });

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));

  // ---------- Modal Controls ----------
  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function addClothesButtonClick() {
    setActiveModal("add-garment");
  }

  function handleEditProfileClick() {
    setActiveModal("edit-profile");
  }

  function closeModal() {
    setActiveModal("");
  }

  // ---------- Add Item ----------
  function handleAddItem(values, handleReset) {
    const newItem = {
      name: values.name.trim(),
      imageUrl: values.imageUrl.trim(),
      weather: values.weather,
    };

    if (!newItem.name || !newItem.imageUrl || !newItem.weather) return;

    apiAddItem(newItem)
      .then((createdItem) => {
        const normalized = normalizeItem(createdItem);
        setClothingItems((prev) => [normalized, ...prev]);
        handleReset();
        closeModal();
      })
      .catch((err) => console.error("POST /items failed:", err));
  }

  // ---------- Delete Item ----------
  function openConfirmModal(card) {
    setSelectedCard(card);
    setActiveModal("confirm");
  }

  function handleDeleteItem() {
    const id = selectedCard._id || selectedCard.id;
    if (!id) return;

    apiDeleteItem(id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== id && item.id !== id)
        );
        closeModal();
      })
      .catch((err) => console.error("DELETE /items failed:", err));
  }

  // ---------- Like / Unlike Item ----------
  function handleCardLike({ id, isLiked }) {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const likeRequest = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);

    likeRequest
      .then((updatedCard) => {
        const normalized = normalizeItem(updatedCard);
        setClothingItems((prev) =>
          prev.map((item) =>
            item._id === id || item.id === id ? normalized : item
          )
        );
      })
      .catch((err) => console.error("Toggle like failed:", err));
  }

  // ---------- Acquire Coordinates (cache -> geolocation -> IP -> default) ----------
  useEffect(() => {
    let mounted = true;
    setCoordsFetchError(null);

    (async () => {
      try {
        const result = await getBestCoordinates({
          ttl: 10 * 60 * 1000,
          timeout: 10000,
          defaultCoords: {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
          },
        });
        if (!mounted) return;
        setCoords({ latitude: result.lat, longitude: result.lon });
        setCoordsSource(result.source);
        setLocationPermissionDenied(!!result.permissionDenied);
      } catch (err) {
        console.error("Failed to obtain coordinates:", err);
        if (!mounted) return;
        setCoords({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        });
        setCoordsSource("default");
        setCoordsFetchError(err?.message ?? String(err));
      }
    })();

    return () => {
      mounted = false;
    };
  }, [coordsRetryCount]);

  // ---------- Fetch Weather when coords available ----------
  useEffect(() => {
    if (!coords) return;
    getWeather(coords, APIKey)
      .then((localeData) => setWeatherData(filterWeatherData(localeData)))
      .catch(console.error);
  }, [coords]);

  // ---------- Fetch Items (allowed for everyone) ----------
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.map(normalizeItem));
      })
      .catch((err) => console.error("GET /items failed:", err));
  }, []);

  // ---------- Check token on app load ----------
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  // Retry handler to re-request geolocation
  const handleRetryLocation = useCallback(() => {
    setLocationPermissionDenied(false);
    setCoordsRetryCount((c) => c + 1);
  }, []);

  // ---------- Register ----------
  function handleRegister({ name, avatar, email, password }, handleReset) {
    signup({ name, avatar, email, password })
      .then(() => signin({ email, password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleReset?.();
        closeModal();
      })
      .catch((err) => console.error("Registration failed:", err));
  }

  // ---------- Login ----------
  function handleLogin({ email, password }, handleReset) {
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleReset?.();
        closeModal();
      })
      .catch((err) => console.error("Login failed:", err));
  }

 // ---------- Sign Out ----------
 function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveModal("");
    navigate("/");
  }

  // ---------- Update User ----------
  function handleUpdateUser({ name, avatar }, handleReset) {
    updateUser({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleReset?.();
        closeModal();
      })
      .catch((err) => console.error("Update profile failed:", err));
  }

  // ---------- Render ----------
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__wrapper">
            {locationPermissionDenied && (
              <div
                className="location-warning"
                role="status"
                aria-live="polite"
              >
                We couldn't access your precise location (permission denied).
                Using an approximate location for weather.
                <button
                  className="location-warning__retry"
                  onClick={handleRetryLocation}
                >
                  Retry
                </button>
              </div>
            )}

            <Header
              addClothesButtonClick={addClothesButtonClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onSignUp={() => setActiveModal("register")}
              onLogIn={() => setActiveModal("login")}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      addClothesButtonClick={addClothesButtonClick}
                      handleCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onEditProfile={handleEditProfileClick}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            activeModal={activeModal}
            onClose={closeModal}
            onAddItem={handleAddItem}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeModal}
            onOpenConfirm={() => openConfirmModal(selectedCard)}
          />

          <ConfirmDeleteModal
            activeModal={activeModal}
            onClose={closeModal}
            onConfirm={handleDeleteItem}
          />

          <RegisterModal
            activeModal={activeModal}
            onClose={closeModal}
            onRegister={handleRegister}
            onSwitchToLogin={() => setActiveModal("login")}
          />

          <LoginModal
            activeModal={activeModal}
            onClose={closeModal}
            onLogin={handleLogin}
            onSwitchToRegister={() => setActiveModal("register")}
          />

          <EditProfileModal
            activeModal={activeModal}
            onClose={closeModal}
            onUpdateUser={handleUpdateUser}
            currentUser={currentUser}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
