import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import sunnyDay from "../../assets/sunny-day.png";
import sunnyNight from "../../assets/sunny-night.png";
import cloudyDay from "../../assets/cloudy-day.png";
import cloudyNight from "../../assets/cloudy-night.png";
import rainyDay from "../../assets/rainy-day.png";
import rainyNight from "../../assets/rainy-night.png";
import stormyDay from "../../assets/stormy-day.png";
import stormyNight from "../../assets/stormy-night.png";
import snowyDay from "../../assets/snowy-day.png";
import snowyNight from "../../assets/snowy-night.png";
import foggyDay from "../../assets/foggy-day.png";
import foggyNight from "../../assets/foggy-night.png";

const backgrounds = {
  "sunny-day": sunnyDay,
  "sunny-night": sunnyNight,
  "cloudy-day": cloudyDay,
  "cloudy-night": cloudyNight,
  "rain-day": rainyDay,
  "rain-night": rainyNight,
  "storm-day": stormyDay,
  "storm-night": stormyNight,
  "snow-day": snowyDay,
  "snow-night": snowyNight,
  "fog-day": foggyDay,
  "fog-night": foggyNight,
};

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  let key;
  if (weatherData && weatherData.condition) {
    key = weatherData.condition;
  } else {
    key = "sunny-day";
  }

  let src;
  if (backgrounds[key]) {
    src = backgrounds[key];
  } else {
    src = sunnyDay;
  }

  const value = weatherData?.temp?.[currentTemperatureUnit] ?? 0;

  return (
    <section className="weather-card">
      <p className="weather-card__info">
        {Math.round(weatherData?.temp?.[currentTemperatureUnit] ?? 0)}&deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img src={src} alt={key} className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
