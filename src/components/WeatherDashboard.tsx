"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Search, MapPin, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  getWeatherByCity,
  getWeatherByCoords,
  getWeatherByZip,
} from "@/lib/weatherService";
import type { WeatherData } from "@/lib/types";
import { ModeToggle } from "@/components/ThemeSelector";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WeatherDisplay from "@/components/WeatherDisplay";

export default function WeatherDashboard() {
  // State management for weather data and UI controls
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchLat, setSearchLat] = useState("");
  const [searchLon, setSearchLon] = useState("");
  const [isMetric, setIsMetric] = useState(false);
  const [activeTab, setActiveTab] = useState("city");

  // useEffect(() => {
  //   // Try to get user's location on initial load
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         setLoading(true);
  //         getWeatherByCoords(
  //           position.coords.latitude,
  //           position.coords.longitude,
  //         )
  //           .then((data) => {
  //             setWeatherData(data);
  //           })
  //           .catch((err) => {
  //             setError("Failed to fetch weather data for your location");
  //             console.error(err);
  //           })
  //           .finally(() => {
  //             setLoading(false);
  //           });
  //       },
  //       (err) => {
  //         console.error("Geolocation error:", err);
  //       },
  //     );
  //   }
  // }, []);

  // Handle city name search form submission
  const handleCitySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) setError(null);
    if (weatherData) setWeatherData(null);

    // Error checking
    if (!searchCity.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    getWeatherByCity(searchCity)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        setError("City not found. Please check the spelling and try again.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle ZIP code search form submission
  const handleZipSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) setError(null);
    if (weatherData) setWeatherData(null);

    // Error checking
    if (!searchZip.trim()) {
      setError("Please enter a zip code");
      return;
    }

    setLoading(true);
    getWeatherByZip(searchZip)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        setError("Invalid zip code or country. Please check and try again.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle coordinate-based search form submission
  const handleCoordinateSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) setError(null);
    if (weatherData) setWeatherData(null);

    // Error checking
    if (!searchLat.trim() || !searchLon.trim()) {
      setError("Please enter valid coordinates");
      return;
    }
    // Convert the searchLat and searchLon to floats and check if they are valid
    const lat = Number.parseFloat(searchLat);
    const lon = Number.parseFloat(searchLon);
    if (isNaN(lat) || isNaN(lon)) {
      setError("Please enter valid coordinates");
      return;
    }

    setLoading(true);
    getWeatherByCoords(lat, lon)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        setError("Failed to fetch weather data for these coordinates");
        setWeatherData(null);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Get weather data based on user's current geolocation
  const handleGetCurrentLocation = async () => {
    if (navigator.geolocation) {
      setLoading(true);
      // Get user's current location from browser
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (error) setError(null);
          // Use the browser's geolocation to get the weather data
          getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude,
          )
            .then((data) => {
              setWeatherData(data);
            })
            .catch((err) => {
              setError("Failed to fetch weather data for your location");
              setWeatherData(null);
              console.error(err);
            })
            .finally(() => {
              setLoading(false);
            });
        },
        (err) => {
          setLoading(false);
          setError(
            "Unable to get your location. Please check your browser permissions.",
          );
          setWeatherData(null);
          console.error("Geolocation error:", err);
        },
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setWeatherData(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Card with tabs for different search methods */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Search Weather</CardTitle>
            <CardDescription>
              Find weather information by city, zip code, or coordinates
            </CardDescription>
          </div>

          <ModeToggle />
        </CardHeader>
        <CardContent>
          {/* Tabs for different search methods */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger className="w-full cursor-pointer" value="city">
                City Name
              </TabsTrigger>
              <TabsTrigger className="w-full cursor-pointer" value="zip">
                Zip Code
              </TabsTrigger>
              <TabsTrigger className="w-full cursor-pointer" value="coords">
                Coordinates
              </TabsTrigger>
            </TabsList>

            {/* City Name Search Form */}
            <TabsContent value="city">
              <form onSubmit={handleCitySearch} className="flex space-x-2">
                <Input
                  placeholder="Enter city name"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="flex-1"
                />
                <Button
                  className="cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="mr-2 h-4 w-4" />
                  )}
                  Search
                </Button>
              </form>
            </TabsContent>

            {/* Zip Code Search Form */}
            <TabsContent value="zip">
              <form
                onSubmit={handleZipSearch}
                className="flex flex-col space-y-4"
              >
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter ZIP code"
                    value={searchZip}
                    onChange={(e) => setSearchZip(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="mr-2 h-4 w-4" />
                    )}
                    Search
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Coordinate Search Form */}
            <TabsContent value="coords">
              <form
                onSubmit={handleCoordinateSearch}
                className="flex flex-col space-y-4"
              >
                <div className="flex space-x-2">
                  <Input
                    placeholder="Latitude"
                    value={searchLat}
                    onChange={(e) => setSearchLat(e.target.value)}
                    className="flex-1"
                    type="number"
                    step="0.000001"
                  />
                  <Input
                    placeholder="Longitude"
                    value={searchLon}
                    onChange={(e) => setSearchLon(e.target.value)}
                    className="flex-1"
                    type="number"
                    step="0.000001"
                  />
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="mr-2 h-4 w-4" />
                    )}
                    Search
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 flex items-center justify-between">
            {/* Get Current Location Button */}
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={handleGetCurrentLocation}
              disabled={loading}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Use My Location
            </Button>

            {/* Unit Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex cursor-pointer items-center space-x-2">
                  <Label htmlFor="unit-toggle" className="cursor-pointer">
                    °C
                  </Label>
                  <Switch
                    className="cursor-pointer data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-blue-500"
                    id="unit-toggle"
                    checked={!isMetric}
                    onCheckedChange={(checked) => setIsMetric(!checked)}
                  />
                  <Label htmlFor="unit-toggle" className="cursor-pointer">
                    °F
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={2}>
                <p>Toggle between Imperial and Metric units</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      {/* Error message display */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardContent>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Weather information display component */}
      <WeatherDisplay
        loading={loading}
        weatherData={weatherData}
        isMetric={isMetric}
      />
    </div>
  );
}
