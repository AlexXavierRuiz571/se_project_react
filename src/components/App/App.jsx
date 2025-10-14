import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIKey } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const addClothesButtonClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItem = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    const newItem = {
      name: formData.get("name"),
      imageUrl: formData.get("imageUrl"),
      weather: formData.get("weather"),
    };

    if (newItem.name && newItem.imageUrl && newItem.weather) {
      setClothingItems([newItem, ...clothingItems]);
      evt.target.reset();
      setActiveModal("");
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((localeData) => {
        const filteredData = filterWeatherData(localeData);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
    >
      <div className="page">
        <div className="page__wrapper">
          <Header
            addClothesButtonClick={addClothesButtonClick}
            weatherData={weatherData}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  addClothesButtonClick={addClothesButtonClick}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <ModalWithForm
          name="add-garment"
          titleText="New Garment"
          buttonText="Add Garment"
          activeModal={activeModal}
          onClose={closeActiveModal}
          onSubmit={handleAddItem}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              name="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              name="imageUrl"
              placeholder="Image Url"
            />
          </label>
          <fieldset className="modal__weather-buttons">
            <legend className="modal__weather-type-legend">
              Select the weather type:
            </legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                type="radio"
                name="weather"
                value="hot"
                className="modal__radio-input"
              />
              <span>Hot</span>
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                type="radio"
                name="weather"
                value="warm"
                className="modal__radio-input"
              />
              <span>Warm</span>
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                type="radio"
                name="weather"
                value="cold"
                className="modal__radio-input"
              />
              <span>Cold</span>
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
