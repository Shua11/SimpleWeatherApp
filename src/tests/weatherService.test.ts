import {
  getWeatherByCity,
  getWeatherByCoords,
  getWeatherByZip,
} from "@/lib/weatherService";
import { WeatherData } from "@/lib/types";

// Mock the weather data
const mockWeatherData: WeatherData = {
  coord: {
    lon: -94.2088,
    lat: 36.3728,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01n",
    },
  ],
  base: "stations",
  main: {
    temp: 11.59,
    feels_like: 9.61,
    temp_min: 10.45,
    temp_max: 12.12,
    pressure: 1013,
    humidity: 31,
    sea_level: 1013,
    grnd_level: 967,
  },
  visibility: 10000,
  wind: {
    speed: 6.17,
    deg: 140,
  },
  clouds: {
    all: 0,
  },
  dt: 1741312248,
  sys: {
    type: 1,
    id: 6160,
    country: "US",
    sunrise: 1741264816,
    sunset: 1741306564,
  },
  timezone: -21600,
  id: 4101260,
  name: "Bentonville",
  cod: 200,
};

describe("weatherService", () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn();
  });

  describe("getWeatherByCity", () => {
    it("should fetch weather data successfully", async () => {
      // Mock the fetch function to return the mock weather data
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockWeatherData),
      });

      // Call the function and check the result
      const result = await getWeatherByCity("St. Louis");
      expect(result).toEqual(mockWeatherData);
    });

    it("should handle API errors", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(getWeatherByCity("")).rejects.toThrow();
    });
  });

  describe("getWeatherByZip", () => {
    it("should fetch weather data successfully", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockWeatherData),
      });

      const result = await getWeatherByZip("63101");
      expect(result).toEqual(mockWeatherData);
    });

    it("should handle API errors", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(getWeatherByZip("")).rejects.toThrow();
    });
  });

  describe("getWeatherByCoords", () => {
    it("should fetch weather data successfully", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockWeatherData),
      });

      const result = await getWeatherByCoords(36.3728, -94.2088);
      expect(result).toEqual(mockWeatherData);
    });

    it("should handle API errors", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(getWeatherByCoords(0, 0)).rejects.toThrow();
    });
  });
});
