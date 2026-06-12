"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { dict, Lang } from "./lib/i18n";

export default function Home() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("ru");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketValue, setTicketValue] = useState(0);

  const t = dict[lang];
  const totalEuro = 12 * ticketValue;
  const totalRub = totalEuro * 50;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="flex justify-end gap-2">
          <button onClick={() => setLang("ru")} className={lang === "ru" ? "font-bold" : ""}>RU</button>
          <button onClick={() => setLang("en")} className={lang === "en" ? "font-bold" : ""}>EN</button>
        </div>

        <h1 className="text-4xl font-bold">{t.startTitle}</h1>
        <p className="text-gray-500">{t.startSub}</p>
        <p className="rounded-2xl bg-yellow-50 p-4 text-sm leading-6">{t.rules}</p>

        <input placeholder={t.name} value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border p-3" />
        <input placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border p-3" />

        <div className="flex justify-center gap-2">
          {[0, 0.5, 1, 1.5, 2].map((v) => (
            <button key={v} onClick={() => setTicketValue(v)} className={`rounded-xl border px-4 py-2 ${ticketValue === v ? "bg-black text-white" : ""}`}>
              {v}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500">{t.min}</p>
        <div className="text-xl font-semibold">{totalEuro}€ / {totalRub} ₽</div>

        <button
          onClick={() => {
            // if (!name || !email || !ticketValue) return;
            localStorage.setItem("lang", lang);
            localStorage.setItem("playerName", name);
            localStorage.setItem("playerEmail", email);
            localStorage.setItem("ticketValue", String(ticketValue));
            localStorage.setItem("remainingTickets", "12");
            router.push("/gender");
          }}
          className="w-full rounded-2xl bg-black py-4 text-white"
        >
          {t.start}
        </button>
      </div>

      <img
        src="/reveal/page.png"
        alt=""
        aria-hidden
        className="w-full max-w-md mt-8 pointer-events-none select-none"
      />
    </main>
  );
}


