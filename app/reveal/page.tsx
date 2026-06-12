"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { dict, getLang, Lang } from "../lib/i18n";

const SEQUENCE = [1, 2, 3, 1, 2, 3, 4, 5, 6, 6];
const FRAME_MS = 250;

export default function RevealPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [phase, setPhase] = useState<"idle" | "animating" | "done">("idle");
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => setLang(getLang()), []);

  const t = dict[lang];

  function startAnimation() {
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

  const currentFrame =
    phase === "idle" ? null : SEQUENCE[frameIndex];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg w-full space-y-6">

        {/* текст */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{t.accepted}</h1>
          <p className="text-gray-500">{t.thanks}</p>
        </div>

        {/* картинка */}
        <div className="w-full aspect-[3/2] relative rounded-2xl overflow-hidden bg-white">
          {phase === "idle" ? (
            <Image
              src="/reveal/page.png"
              alt="family"
              fill
              className="object-contain"
              priority
            />
          ) : (
            <Image
              key={currentFrame}
              src={`/reveal/reveal-${currentFrame}.png`}
              alt={`frame ${currentFrame}`}
              fill
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* кнопка */}
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
