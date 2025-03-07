import type { WeatherData } from "./types";

// Get weather data by city name
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const weatherData = await fetch(
    `/api/weather/city?city=${encodeURIComponent(city)}`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(`Failed to fetch weather data: ${error}`);
    });

  return weatherData;
}

// Get weather data by zip code
export async function getWeatherByZip(zip: string): Promise<WeatherData> {
  const weatherData = await fetch(
    `/api/weather/zip?zip=${encodeURIComponent(zip)}`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(`Failed to fetch weather data: ${error}`);
    });

  return weatherData;
}

// Get weather data by coordinates
export async function getWeatherByCoords(
  lat: number,
  lon: number,
): Promise<WeatherData> {
  const weatherData = await fetch(`/api/weather/coords?lat=${lat}&lon=${lon}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(`Failed to fetch weather data: ${error}`);
    });

  return weatherData;
}
