"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SummaryPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const ticketValue = Number(localStorage.getItem("ticketValue") || 0);
    const totalEur = 12 * ticketValue;
    const totalRub = totalEur * 1200;

    setData({
      name: localStorage.getItem("playerName") || "",
      email: localStorage.getItem("playerEmail") || "",
      ticketValue,
      gender: localStorage.getItem("gender") || "",
      genderTickets: localStorage.getItem("genderTickets") || "",
      birthDate: localStorage.getItem("birthDate") || "",
      dateTickets: localStorage.getItem("dateTickets") || "",
      weight: localStorage.getItem("weight") || "",
      weightTickets: localStorage.getItem("weightTickets") || "",
      time: localStorage.getItem("time") || "",
      timeTickets: localStorage.getItem("timeTickets") || "",
      eyes: localStorage.getItem("eyes") || "",
      eyesTickets: localStorage.getItem("eyesTickets") || "",
      hair: localStorage.getItem("hair") || "",
      hairTickets: localStorage.getItem("hairTickets") || "",
      totalEur,
      totalRub,
    });
  }, []);

  async function submit() {
    if (!data) return;

    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/submit", {
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

  if (!data) return null;

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-md w-full space-y-5">
        <h1 className="text-3xl font-bold">Проверь ответы</h1>

        <div className="text-left rounded-2xl bg-gray-100 p-4 space-y-2 text-sm">
          <p><b>Имя:</b> {data.name}</p>
          <p><b>Email:</b> {data.email}</p>
          <p><b>Ставка:</b> {data.ticketValue}€ / {data.ticketValue * 1200}₽ за тикет</p>
          <p><b>Пол:</b> {data.gender} — {data.genderTickets} тик.</p>
          <p><b>Дата:</b> {data.birthDate} — {data.dateTickets} тик.</p>
          <p><b>Вес:</b> {data.weight} г — {data.weightTickets} тик.</p>
          <p><b>Время:</b> {data.time}:00 — {data.timeTickets} тик.</p>
          <p><b>Глаза:</b> {data.eyes} — {data.eyesTickets} тик.</p>
          <p><b>Волосы:</b> {data.hair} — {data.hairTickets} тик.</p>
          <p><b>Итого:</b> {data.totalEur}€ / {data.totalRub}₽</p>
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
