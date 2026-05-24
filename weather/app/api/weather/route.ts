import { type NextRequest } from "next/server";
import { findTaiwanCity } from "@/app/lib/taiwan-cities";

type OpenWeatherResponse = {
  weather?: Array<{
    description?: string;
    icon?: string;
  }>;
  main?: {
    temp?: number;
    feels_like?: number;
    humidity?: number;
  };
  wind?: {
    speed?: number;
  };
  dt?: number;
};

export async function GET(request: NextRequest) {
  const cityName = request.nextUrl.searchParams.get("city");

  if (!cityName) {
    return Response.json({ message: "請提供城市名稱。" }, { status: 400 });
  }

  const city = findTaiwanCity(cityName);

  if (!city) {
    return Response.json({ message: "不支援的台灣縣市。" }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return Response.json(
      { message: "尚未設定 OPENWEATHER_API_KEY 環境變數。" },
      { status: 500 },
    );
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("lat", String(city.lat));
  url.searchParams.set("lon", String(city.lon));
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "zh_tw");

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      return Response.json(
        { message: "OpenWeather 目前無法回傳天氣資料。" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as OpenWeatherResponse;
    const currentWeather = data.weather?.[0];

    if (
      !currentWeather?.description ||
      !currentWeather.icon ||
      typeof data.main?.temp !== "number" ||
      typeof data.main.feels_like !== "number" ||
      typeof data.main.humidity !== "number" ||
      typeof data.wind?.speed !== "number"
    ) {
      return Response.json(
        { message: "OpenWeather 回傳資料格式不完整。" },
        { status: 502 },
      );
    }

    return Response.json({
      city: city.name,
      description: currentWeather.description,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: currentWeather.icon,
      updatedAt: new Date((data.dt ?? Date.now() / 1000) * 1000).toISOString(),
    });
  } catch {
    return Response.json(
      { message: "連線 OpenWeather 時發生錯誤。" },
      { status: 502 },
    );
  }
}
