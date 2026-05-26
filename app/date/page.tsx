"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const dates = Array.from({length:43},(_,i)=>{const d=new Date(2026,9,21); d.setDate(d.getDate()+i); return d;});

export default function DatePage(){
  const router = useRouter();
  const [index,setIndex]=useState(28);
  const [tickets,setTickets]=useState(0);
  const total = typeof window !== "undefined" ? Number(localStorage.getItem("remainingTickets") || 12) : 12;
  const remaining=total-tickets;
  const selectedDate=dates[index];

  return <main className="min-h-screen px-6 pb-28 flex flex-col items-center justify-center text-center">
    <div className="max-w-md w-full space-y-8">
      <h1 className="text-4xl font-bold">Birth date?</h1>
      <div className="text-5xl font-bold">{selectedDate.toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</div>
      <p className="text-gray-500 text-xl">EDD: 18 Nov 2026 ⭐</p>
      <input className="w-full" type="range" min="0" max={dates.length-1} value={index} onChange={e=>setIndex(+e.target.value)} />
      <p className="text-gray-500">21 Oct — 2 Dec</p>
      <TicketPicker tickets={tickets} setTickets={setTickets}/>
      <p className="text-2xl text-gray-500">Remaining: {remaining}</p>
    </div>
    <BottomButton onClick={()=>{
      localStorage.setItem("birthDate", selectedDate.toISOString());
      localStorage.setItem("dateTickets", String(tickets));
      localStorage.setItem("remainingTickets", String(remaining));
      router.push("/weight");
    }}>Next</BottomButton>
  </main>
}

function TicketPicker({tickets,setTickets}:any){return <div><p className="mb-4 text-2xl">Tickets</p><div className="flex justify-center gap-3">{[0,1,2,3,4].map(n=><button key={n} onClick={()=>setTickets(n)} className={`w-14 h-14 border-2 rounded-xl text-xl ${tickets===n?"bg-black text-white":"bg-white"}`}>{n}</button>)}</div></div>}
function BottomButton({children,onClick}:any){return <div className="fixed bottom-4 left-0 w-full px-6"><button onClick={onClick} className="w-full bg-black text-white py-4 rounded-2xl text-xl">{children}</button></div>}
