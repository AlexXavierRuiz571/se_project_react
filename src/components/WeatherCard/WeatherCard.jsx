import "./WeatherCard.css";
import sunnyDay from "../../assets/sunny-day.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__info">75&deg; F</p>
      <img src={sunnyDay} alt="Sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
