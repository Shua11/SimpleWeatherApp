import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Droplets, Wind, Sunrise, Sunset } from "lucide-react";
import WeatherIcon from "@/components/WeatherIcon";
import type { WeatherData } from "@/lib/types";

interface WeatherDisplayProps {
  loading: boolean;
  weatherData: WeatherData | null;
  isMetric: boolean;
}

export default function WeatherDisplay({
  loading,
  weatherData,
  isMetric,
}: WeatherDisplayProps) {
  const formatTemp = (temp: number) => {
    // Convert temperature to Fahrenheit if not metric
    // Formula: (temp * 1.8) + 32
    const temperature = isMetric ? temp : temp * 1.8 + 32;
    return `${Math.round(temperature)}°${isMetric ? "C" : "F"}`;
  };

  const formatSpeed = (speedMs: number) => {
    // Convert m/s to km/h first (multiply by 3.6)
    const speedKmh = speedMs * 3.6;
    // Convert speed from km/h to mph if not metric
    const speed = isMetric ? speedKmh : speedKmh / 1.609344;
    return `${Math.round(speed)} ${isMetric ? "km/h" : "mph"}`;
  };

  const formatTime = (timestamp: number, timezone: number) => {
    // Convert timestamp to milliseconds and add timezone offset
    // Both the timezone and timestamp are UTC
    const date = new Date(timestamp * 1000 + timezone * 1000);
    // Use UTC methods to get the correct time with timezone offset
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-24 w-1/3" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl md:text-3xl">
              {weatherData.name}
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-sm">
              {weatherData.sys.country} | Lat:{" "}
              {weatherData.coord.lat.toFixed(2)}, Lon:{" "}
              {weatherData.coord.lon.toFixed(2)}
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Main Weather Card */}
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <WeatherIcon code={weatherData.weather[0].icon} />
            <div className="ml-4">
              <h3 className="text-lg font-medium capitalize">
                {weatherData.weather[0].description}
              </h3>
              <p className="text-4xl font-bold">
                {formatTemp(weatherData.main.temp)}
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm">
              Feels like:{" "}
              <span className="font-medium">
                {formatTemp(weatherData.main.feels_like)}
              </span>
            </p>
            <p className="text-sm">
              High:{" "}
              <span className="font-medium">
                {formatTemp(weatherData.main.temp_max)}
              </span>{" "}
              | Low:{" "}
              <span className="font-medium">
                {formatTemp(weatherData.main.temp_min)}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card>
            {/* Humidity Card */}
            <CardContent className="flex flex-col items-center pt-6">
              <Droplets className="mb-2 h-8 w-8 text-blue-500" />
              <p className="text-muted-foreground text-sm">Humidity</p>
              <p className="text-xl font-bold">{weatherData.main.humidity}%</p>
            </CardContent>
          </Card>

          {/* Wind Card */}
          <Card>
            <CardContent className="flex flex-col items-center pt-6">
              <Wind className="mb-2 h-8 w-8 text-blue-500" />
              <p className="text-muted-foreground text-sm">Wind</p>
              <p className="text-xl font-bold">
                {formatSpeed(weatherData.wind.speed)}
              </p>
            </CardContent>
          </Card>

          {/* Sunrise Card */}
          <Card>
            <CardContent className="flex flex-col items-center pt-6">
              <Sunrise className="mb-2 h-8 w-8 text-orange-500" />
              <p className="text-muted-foreground text-sm">Sunrise</p>
              <p className="text-xl font-bold">
                {formatTime(weatherData.sys.sunrise, weatherData.timezone)}
              </p>
            </CardContent>
          </Card>

          {/* Sunset Card */}
          <Card>
            <CardContent className="flex flex-col items-center pt-6">
              <Sunset className="mb-2 h-8 w-8 text-orange-500" />
              <p className="text-muted-foreground text-sm">Sunset</p>
              <p className="text-xl font-bold">
                {formatTime(weatherData.sys.sunset, weatherData.timezone)}
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="text-muted-foreground text-sm">
        Last updated: {new Date().toLocaleTimeString()}
      </CardFooter>

      {/* This is for debugging */}
      <details className="px-4">
        <summary className="text-muted-foreground cursor-pointer text-sm">
          Show raw data
        </summary>
        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
      </details>
    </Card>
  );
}
