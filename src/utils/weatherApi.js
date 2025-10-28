import { checkResponse } from "./api";

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(checkResponse);
};

export const filterWeatherData = (localeData) => {
  const result = {};

  result.city = localeData.name;
  result.temp = {};
  result.temp.F = Math.round(localeData.main.temp);
  result.temp.C = Math.round((result.temp.F - 32) * (5 / 9));
  result.type = getWeatherType(result.temp.F);

  const id =
    typeof localeData?.weather?.[0]?.id === "number"
      ? localeData.weather[0].id
      : 800;

  let baseCondition = "sunny";
  if (id >= 200 && id < 300) baseCondition = "stormy";
  else if (id >= 300 && id < 600) baseCondition = "rainy";
  else if (id >= 600 && id < 700) baseCondition = "snowy";
  else if (id >= 700 && id < 800) baseCondition = "foggy";
  else if (id === 800) baseCondition = "sunny";
  else if (id > 800 && id < 900) baseCondition = "cloudy";

  const sunrise = localeData?.sys?.sunrise;
  const sunset = localeData?.sys?.sunset;
  const now = Math.floor(Date.now() / 1000);
  const isDay =
    typeof sunrise === "number" && typeof sunset === "number"
      ? now >= sunrise && now < sunset
      : true;

  result.condition = `${baseCondition}-${isDay ? "day" : "night"}`;
  return result;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};
