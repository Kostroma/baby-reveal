mkdir -p app/components app/lib app/{gender,date,weight,time,eyes,hair,summary,reveal,face}

cat > app/lib/i18n.ts << 'EOT'
export const text = {
  ru: {
    startTitle: "Скоро появится малыш 👶",
    startSub: "Сделай свои предсказания и попробуй выиграть.",
    rules: "Ты выбираешь стоимость одного тикета. Все твои ставки считаются от неё. Чем выше ставка — тем больше возможный выигрыш. 50% банка получают будущие родители 💛",
    min: "*100 р минимальная ставка для участия в призе",
    name: "Имя",
    email: "Email",
    start: "Начать",
    genderTitle: "Мальчик или девочка?",
    gameRules: "У тебя есть 12 тикетов и 6 вопросов. Ты сам решаешь: поставить всё на один вариант или распределить. Чем увереннее — тем больше ставь.",
    gotIt: "Все понял",
    tickets: "Тикеты",
    remaining: "Осталось",
    next: "Дальше",
    dateTitle: "Когда родится малыш?",
    weightTitle: "Вес при рождении?",
    timeTitle: "Время рождения?",
    eyesTitle: "Цвет глаз?",
    hairTitle: "Цвет волос при рождении?",
    finish: "Завершить",
    summary: "Проверь ответы",
    send: "Отправить",
    done: "Готово 🎉",
  },
  en: {
    startTitle: "Tiny human is coming 👶",
    startSub: "Make your predictions and try to win.",
    rules: "You choose the value of one ticket. All your bets are based on it. The higher your ticket value, the higher your possible prize. 50% of the pot goes to the future parents 💛",
    min: "*100 RUB minimum to join the prize pool",
    name: "Name",
    email: "Email",
    start: "Start",
    genderTitle: "Boy or girl?",
    gameRules: "You have 12 tickets and 6 questions. You decide how to spend them: all in on one answer or spread them around. The more confident you are, the more you bet.",
    gotIt: "I understand",
    tickets: "Tickets",
    remaining: "Remaining",
    next: "Next",
    dateTitle: "When will baby arrive?",
    weightTitle: "Birth weight?",
    timeTitle: "Birth time?",
    eyesTitle: "Eye color?",
    hairTitle: "Hair color at birth?",
    finish: "Finish",
    summary: "Check your answers",
    send: "Send",
    done: "Done 🎉",
  },
} as const;

export type Lang = keyof typeof text;
EOT

cat > app/components/GameUI.tsx << 'EOT'
"use client";

export function TicketPicker({ label, tickets, setTickets }: any) {
  return (
    <div>
      <p className="mb-3 text-lg font-medium">{label}</p>
      <div className="flex justify-center gap-3">
        {[0, 1, 2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => setTickets(n)}
            className={`w-12 h-12 rounded-xl border-2 text-lg ${
              tickets === n ? "bg-black text-white" : "bg-white"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

export function BottomButton({ children, onClick, disabled = false }: any) {
  return (
    <div className="fixed bottom-4 left-0 w-full px-6">
      <button
        disabled={disabled}
        onClick={onClick}
        className="w-full rounded-2xl bg-black py-4 text-lg text-white disabled:opacity-40"
      >
        {children}
      </button>
    </div>
  );
}
EOT

cat > app/page.tsx << 'EOT'
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { text, Lang } from "./lib/i18n";

export default function Home() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("ru");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketValue, setTicketValue] = useState(0);

  const t = text[lang];
  const totalEuro = 12 * ticketValue;
  const totalRub = totalEuro * 1200;

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
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
    </main>
  );
}
EOT

echo "OK language/text base added"
