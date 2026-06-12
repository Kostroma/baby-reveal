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
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-8 text-center">
      <div className="max-w-md w-full space-y-4">
        <div className="flex justify-end gap-2">
          <button onClick={() => setLang("ru")} className={lang === "ru" ? "font-bold" : ""}>RU</button>
          <button onClick={() => setLang("en")} className={lang === "en" ? "font-bold" : ""}>EN</button>
        </div>

        <h1 className="text-3xl font-bold">{t.startTitle}</h1>

        <img
          src="/reveal/page.png"
          alt=""
          aria-hidden
          className="w-full pointer-events-none select-none"
        />

<p className="text-gray-500 text-sm">{t.startSub}</p>
        <p className="rounded-2xl bg-yellow-50 p-3 text-xs leading-5">{t.rules}</p>

        <input placeholder={t.name} value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" />
        <input placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border p-2.5 text-sm" />

        <div className="flex justify-center gap-2">
          {[0, 0.5, 1, 1.5, 2].map((v) => (
            <button key={v} onClick={() => setTicketValue(v)} className={`rounded-xl border px-3 py-1.5 text-sm ${ticketValue === v ? "bg-black text-white" : ""}`}>
              {v}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500">{t.min}</p>
        <div className="text-lg font-semibold">{totalEuro}€ / {totalRub} ₽</div>

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
          className="w-full rounded-2xl bg-black py-3 text-white"
        >
          {t.start}
        </button>

        {/* ссылки оплаты */}
        <div className="flex gap-3">
          <a
            href="https://revolut.me/alexostanin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-2xl border-2 border-black py-3 text-sm font-medium text-center"
          >
            💳 Revolut (€)
          </a>
          <a
            href="https://www.tinkoff.ru/rm/r_VmnfQiijZR.TRWtJzECiR/PJRpI6816"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-2xl border-2 border-black py-3 text-sm font-medium text-center"
          >
            💳 Тинькофф (₽)
          </a>
        </div>
      </div>
    </main>
  );
}
