import { useEffect, useState } from "react";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ConfirmDeleteModal from "../DeleteConfirmationModal/ConfirmDeleteModal.jsx";

import Profile from "../Profile/Profile.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import { Routes, Route } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIKey } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";

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

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function addClothesButtonClick() {
    setActiveModal("add-garment");
  }

  function closeActiveModal() {
    setActiveModal("");
  }

  function handleAddItem(values, handleReset) {
    const newItem = {
      name: values.name.trim(),
      link: values.imageUrl.trim(),
      weather: values.weather,
    };

    if (!newItem.name || !newItem.link || !newItem.weather) return;

    setClothingItems((prev) => [newItem, ...prev]);
    handleReset();
    setActiveModal("");
  }

 function openConfirmModal() {
  setActiveModal("confirm");
}

function closeModal() {
  setActiveModal("");
}

function handleDeleteItem() {
  console.log("Item deleted");
  closeModal();
}


  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((localeData) => setWeatherData(filterWeatherData(localeData)))
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

        <AddItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          onAddItem={handleAddItem}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeModal}
          onOpenConfirm={openConfirmModal}
        />

        <ConfirmDeleteModal
          activeModal={activeModal}
          onClose={closeModal}
          onConfirm={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
