"use client";

import { dict, getLang } from "../lib/i18n";

export default function DonePage() {
  const t = dict[getLang()];

  return (
    <main className="min-h-screen px-6 flex items-center justify-center text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{t.doneTitle}</h1>
        <p className="text-xl text-gray-500">{t.doneSub}</p>
      </div>
    </main>
  );
}
