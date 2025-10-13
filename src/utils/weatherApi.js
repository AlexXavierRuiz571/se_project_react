export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: $(res.status)`);
    }
  });
};

export const filterWeatherData = (localeData) => {
  const result = {};

  result.city = localeData.name;
  result.temp = {};
  result.temp.F = Math.round(localeData.main.temp);
  result.temp.C = Math.round((result.temp.F - 32) * (5 / 9));
  result.type = getWeatherType(result.temp.F);

  let id = 800;
  if (
    localeData &&
    localeData.weather &&
    localeData.weather[0] &&
    typeof localeData.weather[0].id === "number"
  ) {
    id = localeData.weather[0].id;
  }

  let baseCondition = "sunny";
  if (id >= 200 && id < 300) {
    baseCondition = "storm";
  } else if (id >= 300 && id < 600) {
    baseCondition = "rain";
  } else if (id >= 600 && id < 700) {
    baseCondition = "snow";
  } else if (id >= 700 && id < 800) {
    baseCondition = "fog";
  } else if (id === 800) {
    baseCondition = "sunny";
  } else if (id > 800 && id < 900) {
    baseCondition = "cloudy";
  }

  let isDay = true;
  if (
    localeData &&
    localeData.sys &&
    typeof localeData.sys.sunrise === "number" &&
    typeof localeData.sys.sunset === "number"
  ) {
    const currentTimeSeconds = Math.floor(Date.now() / 1000);
    isDay =
      currentTimeSeconds >= localeData.sys.sunrise &&
      currentTimeSeconds < localeData.sys.sunset;
  }

  result.condition = baseCondition + "-" + (isDay ? "day" : "night");
  return result;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
