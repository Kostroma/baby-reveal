"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { dict, getLang } from "../lib/i18n";

export default function GenderPage() {
  const router = useRouter();

  const lang = getLang();
  const t = dict[lang];

  const [selected, setSelected] = useState("girl");
  const [tickets, setTickets] = useState(0);

  const total =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("remainingTickets") || 12)
      : 12;

  const remaining = total - tickets;

  return (
    <main className="min-h-screen px-6 pb-28 flex flex-col items-center justify-center text-center">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-4xl font-bold">
          {t.gender}
        </h1>

        <div className="flex gap-4 justify-center">
          {["boy", "girl"].map((v) => (
            <button
              key={v}
              onClick={() => setSelected(v)}
              className={`px-8 py-5 rounded-2xl border-2 ${
                selected === v
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              <div className="text-5xl">
                {v === "boy" ? "👦" : "👧"}
              </div>

              <div className="mt-2 text-base">
                {v === "boy"
                  ? t.boy
                  : t.girl}
              </div>
            </button>
          ))}
        </div>

        <TicketPicker
          tickets={tickets}
          setTickets={setTickets}
          remaining={total}
          label={t.tickets}
        />

        <p className="text-2xl text-gray-500">
          {t.remaining}: {remaining}
        </p>
      </div>

      <BottomButton
        onClick={() => {
          localStorage.setItem("gender", selected);
          localStorage.setItem(
            "genderTickets",
            String(tickets)
          );
          localStorage.setItem(
            "remainingTickets",
            String(remaining)
          );

          router.push("/date");
        }}
      >
        {t.next}
      </BottomButton>
    </main>
  );
}

function TicketPicker({
  tickets,
  setTickets,
  remaining,
  label,
}: any) {
  return (
    <div>
      <p className="mb-4 text-2xl">
        {label}
      </p>

      <div className="flex justify-center gap-3">
        {[0, 1, 2, 3, 4].map((n) => (
          <button
            key={n}
            disabled={n > remaining}
            onClick={() => setTickets(n)}
            className={`w-14 h-14 border-2 rounded-xl text-xl ${
              tickets === n
                ? "bg-black text-white"
                : "bg-white"
            } ${
              n > remaining
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function BottomButton({
  children,
  onClick,
}: any) {
  return (
    <div className="fixed bottom-4 left-0 w-full px-6">
      <button
        onClick={onClick}
        className="w-full bg-black text-white py-4 rounded-2xl text-xl"
      >
        {children}
      </button>
    </div>
  );
}
