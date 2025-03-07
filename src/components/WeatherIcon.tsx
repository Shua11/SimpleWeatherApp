import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Moon,
  Sun,
} from "lucide-react";

interface WeatherIconProps {
  code: string;
}

export default function WeatherIcon({ code }: WeatherIconProps) {
  // Weather codes based on OpenWeatherMap API
  // https://openweathermap.org/weather-conditions
  const iconCodeMap: Record<string, typeof Sun> = {
    "01d": Sun,
    "01n": Moon,
    "02d": CloudSun,
    "02n": CloudMoon,
    "03d": Cloud,
    "03n": Cloud,
    "04d": Cloudy,
    "04n": Cloudy,
    "09d": CloudDrizzle,
    "09n": CloudDrizzle,
    "10d": CloudRain,
    "10n": CloudRain,
    "11d": CloudLightning,
    "11n": CloudLightning,
    "13d": CloudSnow,
    "13n": CloudSnow,
    "50d": CloudFog,
    "50n": CloudFog,
  };

  const Icon = iconCodeMap[code];

  if (Icon) {
    return <Icon className={"h-24 w-24"} />;
  } else {
    return <Sun className={"h-24 w-24"} />;
  }
}
