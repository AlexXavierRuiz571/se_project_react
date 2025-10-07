import "./WeatherCard.css";
import sunnyDay from "../../assets/sunny-day.png";

function WeatherCard({weatherData}) {
  return (
    <section className="weather-card">
      <p className="weather-card__info">{weatherData.temp.F}&deg; F</p>
      <img src={sunnyDay} alt="Sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
