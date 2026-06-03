mkdir -p app/lib app/components

cat > app/lib/i18n.ts << 'EOT'
export type Lang = "ru" | "en";

export const dict = {
  ru: {
    next:"Дальше", finish:"Завершить", tickets:"Тикеты", remaining:"Осталось",
    startTitle:"Скоро появится малыш 👶",
    startSub:"Сделай предсказания и попробуй выиграть.",
    rules:"Ты выбираешь стоимость одного тикета. Все ставки считаются от неё. Чем выше ставка — тем больше возможный выигрыш. 50% банка получают будущие родители 💛",
    min:"*100 р минимальная ставка для участия в призе",
    name:"Имя", email:"Email", start:"Начать",
    gameRules:"У тебя есть 12 тикетов и 6 вопросов. Ты сам решаешь, сколько потратить на каждый вопрос.",
    gotIt:"Все понял",
    gender:"Мальчик или девочка?", boy:"Мальчик", girl:"Девочка",
    date:"Когда родится малыш?", edd:"ПДР: 18 ноября 2026 ⭐",
    weight:"Вес при рождении?", time:"Время рождения?",
    eyes:"Цвет глаз?", hair:"Цвет волос при рождении?",
    summary:"Проверь ответы", send:"Отправить ответы", sending:"Отправляем...",
    accepted:"Ответы приняты 🎉", thanks:"Спасибо! Теперь твои предсказания участвуют в игре."
  },
  en: {
    next:"Next", finish:"Finish", tickets:"Tickets", remaining:"Remaining",
    startTitle:"Tiny human is coming 👶",
    startSub:"Make your predictions and try to win.",
    rules:"You choose the value of one ticket. All bets are based on it. The higher your ticket value, the higher your possible prize. 50% of the pot goes to the future parents 💛",
    min:"*100 RUB minimum to join the prize pool",
    name:"Name", email:"Email", start:"Start",
    gameRules:"You have 12 tickets and 6 questions. You decide how many to spend on each question.",
    gotIt:"I understand",
    gender:"Boy or girl?", boy:"Boy", girl:"Girl",
    date:"When will baby arrive?", edd:"EDD: 18 Nov 2026 ⭐",
    weight:"Birth weight?", time:"Birth time?",
    eyes:"Eye color?", hair:"Hair color at birth?",
    summary:"Check your answers", send:"Submit answers", sending:"Submitting...",
    accepted:"Answers accepted 🎉", thanks:"Thank you! Your predictions are now in the game."
  }
} as const;

export function getLang(): Lang {
  if (typeof window === "undefined") return "ru";
  return (localStorage.getItem("lang") as Lang) || "ru";
}
EOT

cat > app/components/GameUI.tsx << 'EOT'
"use client";

import { Lang, dict } from "../lib/i18n";

export function LangSwitch({lang,setLang}:any){
  return <div className="flex justify-end gap-2">
    {["ru","en"].map(l=>
      <button key={l} onClick={()=>{setLang(l);localStorage.setItem("lang",l)}}
        className={lang===l?"font-bold underline":""}>{l.toUpperCase()}</button>
    )}
  </div>
}

export function TicketPicker({lang,tickets,setTickets}:any){
  const t=dict[lang as Lang];
  return <div><p className="mb-3 text-lg">{t.tickets}</p>
    <div className="flex justify-center gap-3">
      {[0,1,2,3,4].map(n=>
        <button key={n} onClick={()=>setTickets(n)}
        className={`w-12 h-12 rounded-xl border-2 ${tickets===n?"bg-black text-white":"bg-white"}`}>{n}</button>
      )}
    </div>
  </div>
}

export function BottomButton({children,onClick,disabled}:any){
  return <div className="fixed bottom-4 left-0 w-full px-6">
    <button disabled={disabled} onClick={onClick}
      className="w-full rounded-2xl bg-black py-4 text-lg text-white disabled:opacity-40">{children}</button>
  </div>
}
EOT
