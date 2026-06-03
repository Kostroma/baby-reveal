"use client";

import { useEffect, useState } from "react";
import { dict, getLang, Lang } from "../lib/i18n";

export default function RevealPage() {
  const [lang, setLang] = useState<Lang>("ru");

  useEffect(() => setLang(getLang()), []);

  const t = dict[lang];

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{t.accepted}</h1>
        <p className="text-gray-500">{t.thanks}</p>
      </div>
    </main>
  );
}
