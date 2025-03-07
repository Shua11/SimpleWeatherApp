// Weather data response from OpenWeatherMap API
// https://openweathermap.org/current#fields_json
export interface WeatherData {
  coord: {
    lon: number; // Longitude
    lat: number; // Latitude
  };
  weather: {
    id: number; // Weather condition id
    main: string; // Group of weather parameters (Rain, Snow, Extreme etc.)
    description: string; // Weather condition within the group
    icon: string; // Weather icon id
  }[];
  base: string; // Internal parameter
  main: {
    temp: number; // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    feels_like: number; // Temperature
    temp_min: number; // Minimum temperature at the moment
    temp_max: number; // Maximum temperature at the moment
    pressure: number; // Atmospheric pressure
    humidity: number; // Humidity, %
    sea_level: number; // Atmospheric pressure at sea level
    grnd_level: number; // Atmospheric pressure at ground level
  };
  visibility: number; // Visibility, meter
  wind: {
    speed: number; // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
    deg: number; // Wind direction, degrees (meteorological)
    gust?: number; // Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
  };
  clouds: {
    all: number; // Cloudiness, %
  };
  rain?: {
    "1h"?: number; // Rain volume for the last 1 hour
  };
  snow?: {
    "1h"?: number; // Snow volume for the last 1 hour
  };
  dt: number; // Time of data calculation, unix, UTC
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number; // Sunrise time, unix, UTC
    sunset: number; // Sunset time, unix, UTC
  };
  timezone: number; // Shift in seconds from UTC
  id: number; // City ID
  name: string; // City name
  cod: number; // Internal parameter
}
