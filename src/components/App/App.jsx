import { useEffect, useState } from "react";
import {
  getItems,
  addItem as apiAddItem,
  deleteItem as apiDeleteItem,
} from "../../utils/api";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import Profile from "../Profile/Profile";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIKey } from "../../utils/constants";

function App() {
  // ---------- Weather ----------

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
  });

  // ---------- State ----------

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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

  // ---------- Fetch Weather ----------

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((localeData) => setWeatherData(filterWeatherData(localeData)))
      .catch(console.error);
  }, []);

  // ---------- Fetch Items ----------

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.map(normalizeItem));
      })
      .catch((err) => console.error("GET /items failed:", err));
  }, []);

  // ---------- Render ----------

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
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
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
