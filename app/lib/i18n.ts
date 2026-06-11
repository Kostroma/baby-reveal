
export type Lang = "ru" | "en";

export const dict = {
  ru: {
    next:"Дальше", finish:"Завершить", tickets:"Ставка", remaining:"Осталось жетонов",
    startTitle:"Игра-предсказание для ожидающих малыша",
    startSub:"Сделай предсказания и попробуй выиграть.",
    rules:" У тебя будет 12 жетонов, выбранной стоимости. Все ставки считаются от неё. Чем выше ставка — тем больше возможный выигрыш. 50% банка получают будущие родители 💛",
    min:"*600 р минимальная ставка для участия в призе",
    name:"Имя", email:"Email", start:"Начать",
    gameRules:"У тебя есть 12 жетонов и 6 вопросов. Ты сам решаешь, сколько потратить на каждый вопрос.",
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
    startTitle:"Welcome to baby shower",
    startSub:"Make your predictions and try to win.",
    rules:"You choose the value of one ticket (12 total). All bets are based on it. The higher your ticket value, the higher your possible prize. 50% of the pot goes to the future parents 💛",
    min:"*12 EUR minimum to join the prize pool",
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

