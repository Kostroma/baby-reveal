"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SummaryPage() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const get = (key: string) =>
    typeof window !== "undefined" ? localStorage.getItem(key) || "" : "";

  const ticketValue = Number(get("ticketValue") || 0);
  const totalEur = 12 * ticketValue;
  const totalRub = totalEur * 1200;

  const data = {
    name: get("playerName"),
    email: get("playerEmail"),
    ticketValue,
    gender: get("gender"),
    genderTickets: get("genderTickets"),
    birthDate: get("birthDate"),
    dateTickets: get("dateTickets"),
    weight: get("weight"),
    weightTickets: get("weightTickets"),
    time: get("time"),
    timeTickets: get("timeTickets"),
    eyes: get("eyes"),
    eyesTickets: get("eyesTickets"),
    hair: get("hair"),
    hairTickets: get("hairTickets"),
    totalEur,
    totalRub,
  };

  async function submit() {
    setSending(true);
    setError("");

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submit failed");

      localStorage.setItem("submitted", "true");
      router.push("/reveal");
    } catch {
      setError("Не получилось отправить. Попробуй ещё раз.");
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-md w-full space-y-5">
        <h1 className="text-3xl font-bold">Проверь ответы</h1>

        <div className="text-left rounded-2xl bg-gray-100 p-4 space-y-2 text-sm">
          <p><b>Имя:</b> {data.name}</p>
          <p><b>Email:</b> {data.email}</p>
          <p><b>Ставка:</b> {ticketValue}€ / {ticketValue * 1200}₽ за тикет</p>
          <p><b>Пол:</b> {data.gender} — {data.genderTickets} тик.</p>
          <p><b>Дата:</b> {data.birthDate} — {data.dateTickets} тик.</p>
          <p><b>Вес:</b> {data.weight} г — {data.weightTickets} тик.</p>
          <p><b>Время:</b> {data.time}:00 — {data.timeTickets} тик.</p>
          <p><b>Глаза:</b> {data.eyes} — {data.eyesTickets} тик.</p>
          <p><b>Волосы:</b> {data.hair} — {data.hairTickets} тик.</p>
          <p><b>Итого:</b> {totalEur}€ / {totalRub}₽</p>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          disabled={sending}
          onClick={submit}
          className="w-full bg-black text-white py-4 rounded-2xl disabled:opacity-50"
        >
          {sending ? "Отправляем..." : "Отправить ответы"}
        </button>
      </div>
    </main>
  );
}
