import { NextResponse } from "next/server";

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

if (!API_KEY) {
  console.error(
    "OpenWeatherMap API key is missing. Please add it to your environment variables.",
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");

  if (!zip) {
    return NextResponse.json(
      { error: "ZIP code parameter is required" },
      { status: 400 },
    );
  }

  try {
    const url = `${BASE_URL}?zip=${encodeURIComponent(zip)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch weather data" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 },
    );
  }
}
