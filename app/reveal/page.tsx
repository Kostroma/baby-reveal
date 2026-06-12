"use client";

import { useEffect, useState } from "react";
import { dict, getLang, Lang } from "../lib/i18n";

const SEQUENCE = [1, 2, 3, 1, 2, 3, 4, 5, 6, 7];
const FRAME_MS = 500;
const ALL_FRAMES = [1, 2, 3, 4, 5, 6, 7];

export default function RevealPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [phase, setPhase] = useState<"idle" | "animating" | "done">("idle");
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => setLang(getLang()), []);

  const t = dict[lang];

  function startAnimation() {
    // принудительно декодируем все кадры перед стартом
    ALL_FRAMES.forEach((n) => {
      const img = new Image();
      img.src = `/reveal/reveal-${n}.png`;
    });
    setPhase("animating");
    setFrameIndex(0);
  }

  useEffect(() => {
    if (phase !== "animating") return;

    const interval = setInterval(() => {
      setFrameIndex((prev) => {
        const next = prev + 1;
        if (next >= SEQUENCE.length) {
          clearInterval(interval);
          setPhase("done");
          return prev;
        }
        return next;
      });
    }, FRAME_MS);

    return () => clearInterval(interval);
  }, [phase]);

  const currentFrame = SEQUENCE[frameIndex];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg w-full space-y-6">

        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{t.accepted}</h1>
          <p className="text-gray-500">{t.thanks}</p>
          <p className="text-sm text-gray-600 font-medium">{t.finalTitle}</p>
          <p className="text-sm text-gray-500">{t.finalEmail}</p>
        </div>

        {/* контейнер картинки — все кадры предзагружены, видим только нужный */}
        <div className="w-full aspect-[3/2] relative">
          {/* стартовый кадр (семья без аиста) */}
          <img
            src="/reveal/family.png"
            alt="family"
            className={`absolute inset-0 w-full h-full object-contain transition-none ${
              phase === "idle" ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* кадры анимации — все в DOM, переключаем opacity */}
          {ALL_FRAMES.map((n) => (
            <img
              key={n}
              src={`/reveal/reveal-${n}.png`}
              alt={`frame ${n}`}
              className={`absolute inset-0 w-full h-full object-contain transition-none ${
                phase !== "idle" && currentFrame === n ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {phase === "idle" && (
          <button
            onClick={startAnimation}
            className="w-full bg-black text-white py-4 rounded-2xl text-xl"
          >
            {t.revealButton}
          </button>
        )}

        {phase === "done" && (
          <p className="text-2xl font-semibold text-gray-400">
            {t.revealSubtitle}
          </p>
        )}
      </div>
    </main>
  );
}
