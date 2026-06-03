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
