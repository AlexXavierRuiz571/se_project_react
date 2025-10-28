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
  "rainy-day": rainyDay,
  "rainy-night": rainyNight,
  "stormy-day": stormyDay,
  "stormy-night": stormyNight,
  "snowy-day": snowyDay,
  "snowy-night": snowyNight,
  "foggy-day": foggyDay,
  "foggy-night": foggyNight,
};

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const conditionKey =
    weatherData && weatherData.condition ? weatherData.condition : "sunny-day";

  const src = backgrounds[conditionKey] ?? sunnyDay;

  return (
    <section className="weather-card">
      <p className="weather-card__info">
        {Math.round(weatherData?.temp?.[currentTemperatureUnit] ?? 0)}&deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img src={src} alt={conditionKey} className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
