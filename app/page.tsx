"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketValue, setTicketValue] = useState<number>(0);

  const total = 12 * ticketValue;

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold">Tiny human is coming 👶</h1>

        <p className="text-gray-600">Welcome to our baby prediction game</p>

        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl p-3"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl p-3"
        />

        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Choose what one ticket is worth (€ / *100₽)
          </p>

          <div className="flex justify-center gap-2 flex-wrap">
            {[0, 0.5, 1, 1.5, 2].map((v) => (
              <button
                key={v}
                onClick={() => setTicketValue(v)}
                className={`px-4 py-2 rounded-xl border ${
                  ticketValue === v ? "bg-black text-white" : "bg-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            0 — just for fun
            <br />
            0.5€ / 100₽ minimum for prize
          </p>
        </div>

        <div className="text-lg font-medium">Total: {total}€ / {total * 200}₽</div>

        <div className="flex gap-3 justify-center">
          <a href="#" target="_blank" className="border px-4 py-2 rounded-xl">
            Pay €
          </a>

          <a href="#" target="_blank" className="border px-4 py-2 rounded-xl">
            Pay ₽
          </a>
        </div>

        <button
          onClick={() => {
            localStorage.setItem("playerName", name);
            localStorage.setItem("playerEmail", email);
            localStorage.setItem("ticketValue", String(ticketValue));
            localStorage.setItem("remainingTickets", "12");
            router.push("/gender");
          }}
          className="w-full bg-black text-white py-3 rounded-xl mt-4"
        >
          Start
        </button>
      </div>
    </main>
  );
}
