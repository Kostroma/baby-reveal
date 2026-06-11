"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dict, getLang } from "../lib/i18n";

export default function SummaryPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const lang = getLang();
  const t = dict[lang];

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
      setError(t.submitError);
      setSending(false);
    }
  }

  const genderLabels: Record<string, string> = {
    boy: t.boy,
    girl: t.girl,
  };

  const formattedDate = data?.birthDate
    ? new Date(data.birthDate).toLocaleDateString(
        lang === "ru" ? "ru-RU" : "en-GB",
        { day: "numeric", month: "short" }
      )
    : "";

  const eyeLabels: Record<string, string> = {
    Blue: t.eyeBlue,
    Green: t.eyeGreen,
    Hazel: t.eyeHazel,
  };

  const hairLabels: Record<string, string> = {
    Blonde: t.hairBlonde,
    Ginger: t.hairGinger,
    Brown: t.hairBrown,
  };

  if (!data) return null;

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-md w-full space-y-5">
        <h1 className="text-3xl font-bold">{t.summary}</h1>

        <div className="text-left rounded-2xl bg-gray-100 p-4 space-y-2 text-sm">
          <p><b>{t.name}:</b> {data.name}</p>
          <p><b>{t.email}:</b> {data.email}</p>
          <p><b>{t.bet}:</b> {data.ticketValue}€ / {data.ticketValue * 1200}₽ {t.perTicket}</p>
          <p><b>{t.labelGender}:</b> {genderLabels[data.gender] ?? data.gender} — {data.genderTickets} {t.ticketShort}</p>
          <p><b>{t.labelDate}:</b> {formattedDate} — {data.dateTickets} {t.ticketShort}</p>
          <p><b>{t.labelWeight}:</b> {data.weight} г — {data.weightTickets} {t.ticketShort}</p>
          <p><b>{t.labelTime}:</b> {data.time}:00 — {data.timeTickets} {t.ticketShort}</p>
          <p><b>{t.labelEyes}:</b> {eyeLabels[data.eyes] ?? data.eyes} — {data.eyesTickets} {t.ticketShort}</p>
          <p><b>{t.labelHair}:</b> {hairLabels[data.hair] ?? data.hair} — {data.hairTickets} {t.ticketShort}</p>
          <p><b>{t.labelTotal}:</b> {data.totalEur}€ / {data.totalRub}₽</p>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          disabled={sending}
          onClick={submit}
          className="w-full bg-black text-white py-4 rounded-2xl disabled:opacity-50"
        >
          {sending ? t.sending : t.send}
        </button>
      </div>
    </main>
  );
}
