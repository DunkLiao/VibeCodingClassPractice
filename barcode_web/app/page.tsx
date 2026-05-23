"use client";

import { FormEvent, useRef, useState } from "react";
import QRCode from "qrcode";

const QR_SIZE = 320;

function isValidHttpUrl(value: string): boolean {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return false;
  }

  try {
    const url = new URL(trimmedValue);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function createDownloadFileName(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");

  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const min = pad(now.getMinutes());
  const sec = pad(now.getSeconds());

  return `qrcode-${yyyy}${mm}${dd}-${hh}${min}${sec}.jpg`;
}

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleGenerateQrCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = inputUrl.trim();
    if (!isValidHttpUrl(url)) {
      setError("請輸入有效的網址，且必須以 http:// 或 https:// 開頭。");
      setHasGenerated(false);
      clearCanvas();
      return;
    }

    if (!canvasRef.current) {
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      await QRCode.toCanvas(canvasRef.current, url, {
        width: QR_SIZE,
        margin: 1,
        errorCorrectionLevel: "M",
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      });
      setHasGenerated(true);
    } catch {
      setError("QR Code 產生失敗，請稍後再試。");
      setHasGenerated(false);
      clearCanvas();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadJpg = async () => {
    if (!canvasRef.current || !hasGenerated || error) {
      return;
    }

    const jpegBlob = await new Promise<Blob | null>((resolve) => {
      canvasRef.current?.toBlob(resolve, "image/jpeg", 0.92);
    });

    if (!jpegBlob) {
      setError("目前無法下載圖片，請重新產生 QR Code。");
      return;
    }

    const objectUrl = URL.createObjectURL(jpegBlob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = createDownloadFileName();
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <main className="w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          <section className="space-y-6 p-6 sm:p-8">
            <p className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              URL → QR 工具
            </p>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900">網址轉 QR Code</h1>
              <p className="text-sm leading-6 text-slate-600">
                輸入網站網址後按下「產生 QR Code」，再下載成 .jpg 檔案。
              </p>
            </div>

            <form onSubmit={handleGenerateQrCode} className="space-y-4">
              <label htmlFor="website-url" className="block text-sm font-medium text-slate-700">
                網站網址
              </label>
              <input
                id="website-url"
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder="https://example.com"
                value={inputUrl}
                onChange={(event) => setInputUrl(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />

              {error ? <p className="text-sm text-rose-600">{error}</p> : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isGenerating ? "產生中..." : "產生 QR Code"}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadJpg}
                  disabled={!hasGenerated || Boolean(error)}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                >
                  下載 JPG
                </button>
              </div>
            </form>
          </section>

          <section className="flex min-h-[360px] items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-zinc-950 p-6 sm:p-8">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                QR PREVIEW
              </p>
              <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4">
                <canvas
                  ref={canvasRef}
                  width={QR_SIZE}
                  height={QR_SIZE}
                  className="h-auto w-full max-w-[280px] rounded-lg bg-white"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-600">
                {hasGenerated && !error
                  ? "已產生完成，可直接下載 JPG"
                  : "請先輸入有效網址並產生 QR Code"}
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
