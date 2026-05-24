"use client";

import Image from "next/image";
import { useState } from "react";
import { taiwanCities } from "@/app/lib/taiwan-cities";

type WeatherData = {
  city: string;
  description: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  icon: string;
  updatedAt: string;
};

type RequestState =
  | { status: "idle" }
  | { status: "loading"; city: string }
  | { status: "success"; data: WeatherData }
  | { status: "error"; city?: string; message: string };

const formatTemperature = (value: number) => `${Math.round(value)}°C`;

const formatUpdatedAt = (value: string) =>
  new Intl.DateTimeFormat("zh-TW", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export default function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState("臺北市");
  const [requestState, setRequestState] = useState<RequestState>({
    status: "idle",
  });

  async function loadWeather(city: string) {
    setSelectedCity(city);
    setRequestState({ status: "loading", city });

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`,
      );
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof payload?.message === "string"
            ? payload.message
            : "目前無法取得天氣資料。",
        );
      }

      setRequestState({ status: "success", data: payload as WeatherData });
    } catch (error) {
      setRequestState({
        status: "error",
        city,
        message:
          error instanceof Error ? error.message : "目前無法取得天氣資料。",
      });
    }
  }

  const displayedCity =
    taiwanCities.find((city) => city.name === selectedCity)?.displayName ??
    selectedCity;

  return (
    <main className="min-h-screen bg-[#f4fbff] text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="grid gap-6 border-b border-sky-200 pb-7 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Taiwan Weather
            </p>
            <h1 className="text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
              天氣之子
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              選擇台灣縣市，查看即時溫度、體感、濕度與風速。
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            API 金鑰需設定在伺服器端環境變數{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">
              OPENWEATHER_API_KEY
            </code>
            。
          </div>
        </header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section aria-labelledby="city-picker-title" className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2
                id="city-picker-title"
                className="text-xl font-semibold text-slate-900"
              >
                選擇城市
              </h2>
              <span className="text-sm text-slate-600">22 縣市</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {taiwanCities.map((city) => {
                const isSelected = city.name === selectedCity;

                return (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => loadWeather(city.name)}
                    className={`h-12 rounded-lg border px-3 text-sm font-semibold transition focus:outline-none focus:ring-3 focus:ring-sky-300 ${
                      isSelected
                        ? "border-sky-800 bg-sky-900 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-800 hover:border-sky-400 hover:bg-sky-50"
                    }`}
                  >
                    {city.displayName}
                  </button>
                );
              })}
            </div>
          </section>

          <aside
            aria-live="polite"
            className="min-h-[360px] rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            {requestState.status === "idle" && (
              <div className="flex h-full flex-col justify-center">
                <p className="text-sm font-semibold text-sky-700">
                  尚未查詢
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  先選一個城市
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  目前選取的是 {displayedCity}，點擊左側任一按鈕即可取得當地即時天氣。
                </p>
              </div>
            )}

            {requestState.status === "loading" && (
              <div className="flex h-full flex-col justify-center">
                <p className="text-sm font-semibold text-sky-700">
                  正在連線 OpenWeather
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  讀取 {displayedCity} 天氣中
                </h2>
                <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-sky-500" />
                </div>
              </div>
            )}

            {requestState.status === "error" && (
              <div className="flex h-full flex-col justify-center">
                <p className="text-sm font-semibold text-rose-700">
                  查詢失敗
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  無法取得 {displayedCity} 天氣
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  {requestState.message}
                </p>
              </div>
            )}

            {requestState.status === "success" && (
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-sky-700">
                      即時天氣
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-950">
                      {requestState.data.city}
                    </h2>
                    <p className="mt-2 text-lg text-slate-600">
                      {requestState.data.description}
                    </p>
                  </div>
                  <Image
                    src={`https://openweathermap.org/img/wn/${requestState.data.icon}@2x.png`}
                    alt=""
                    width={82}
                    height={82}
                    className="-mr-2 -mt-3 h-20 w-20"
                  />
                </div>

                <div className="my-8">
                  <p className="text-6xl font-bold tracking-normal text-slate-950">
                    {formatTemperature(requestState.data.temperature)}
                  </p>
                  <p className="mt-3 text-slate-600">
                    體感 {formatTemperature(requestState.data.feelsLike)}
                  </p>
                </div>

                <dl className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-sky-50 p-4">
                    <dt className="text-sm text-slate-600">濕度</dt>
                    <dd className="mt-1 text-2xl font-bold text-slate-950">
                      {requestState.data.humidity}%
                    </dd>
                  </div>
                  <div className="rounded-lg bg-emerald-50 p-4">
                    <dt className="text-sm text-slate-600">風速</dt>
                    <dd className="mt-1 text-2xl font-bold text-slate-950">
                      {requestState.data.windSpeed.toFixed(1)} m/s
                    </dd>
                  </div>
                </dl>

                <p className="mt-auto pt-8 text-sm text-slate-500">
                  更新時間 {formatUpdatedAt(requestState.data.updatedAt)}
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
