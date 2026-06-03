"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HairPage(){
  const router=useRouter();
  const [selected,setSelected]=useState("Blonde");
  const [tickets,setTickets]=useState(0);
  const total = typeof window !== "undefined" ? Number(localStorage.getItem("remainingTickets") || 12) : 12;
  const remaining=total-tickets;

  return <main className="min-h-screen px-6 pb-28 flex flex-col items-center justify-center text-center">
    <div className="max-w-md w-full space-y-8">
      <h1 className="text-4xl font-bold">Цвет волос при рождении?</h1>
      <p className="text-gray-500">Birth hair color is not always final 👶</p>
      <Choice options={["Blonde","Ginger","Light Brown"]} selected={selected} setSelected={setSelected}/>
      <TicketPicker tickets={tickets} setTickets={setTickets} remaining={total}/>
      <p className="text-2xl text-gray-500">Remaining: {remaining}</p>
    </div>
    <BottomButton onClick={()=>{localStorage.setItem("hair",selected);localStorage.setItem("hairTickets",String(tickets));if (tickets > total) return; localStorage.setItem("remainingTickets",String(remaining));router.push("/summary");}}>Finish</BottomButton>
  </main>
}

function Choice({options,selected,setSelected}:any){return <div className="flex gap-3 flex-wrap justify-center">{options.map((o:string)=><button key={o} onClick={()=>setSelected(o)} className={`px-6 py-4 border-2 rounded-2xl text-xl ${selected===o?"bg-black text-white":"bg-white"}`}>{o}</button>)}</div>}
function TicketPicker({tickets,setTickets,remaining}:any){return <div><p className="mb-4 text-2xl">Tickets</p><div className="flex justify-center gap-3">{[0,1,2,3,4].map(n=><button key={n} disabled={n > remaining} onClick={()=>setTickets(n)} className={`w-14 h-14 border-2 rounded-xl text-xl ${tickets===n?"bg-black text-white":"bg-white"} ${n > remaining ? "opacity-30 cursor-not-allowed" : ""}`}>{n}</button>)}</div></div>}
function BottomButton({children,onClick}:any){return <div className="fixed bottom-4 left-0 w-full px-6"><button onClick={onClick} className="w-full bg-black text-white py-4 rounded-2xl text-xl">{children}</button></div>}
