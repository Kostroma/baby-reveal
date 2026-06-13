"use client";

import { dict, getLang } from "../lib/i18n";

export default function AlreadyPage() {
  const t = dict[getLang()];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full space-y-4">
        <div className="text-6xl">🤔</div>
        <h1 className="text-2xl font-bold">
          {getLang() === "ru"
            ? "Похоже, ты уже участвуешь"
            : "Looks like you already joined"}
        </h1>
        <p className="text-gray-500">
          {getLang() === "ru"
            ? "Ответы с этого устройства уже были отправлены. Если что-то пошло не так — напиши организаторам."
            : "Answers from this device have already been submitted. If something went wrong — contact the organizers."}
        </p>
      </div>
    </main>
  );
}
