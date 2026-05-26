"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GenderPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("girl");
  const [tickets, setTickets] = useState(0);
  const total = Number(localStorage.getItem("remainingTickets") || 12);
  const remaining = total - tickets;

  return (
    <main className="min-h-screen px-6 pb-28 flex flex-col items-center justify-center text-center">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-4xl font-bold">Boy or Girl?</h1>

        <div className="flex gap-4 justify-center">
          {["boy","girl"].map(v => (
            <button key={v} onClick={()=>setSelected(v)}
              className={`px-8 py-5 rounded-2xl border-2 text-2xl ${selected===v?"bg-black text-white":"bg-white"}`}>
              {v==="boy" ? "👶 Boy" : "👧 Girl"}
            </button>
          ))}
        </div>

        <TicketPicker tickets={tickets} setTickets={setTickets} />
        <p className="text-2xl text-gray-500">Remaining: {remaining}</p>
      </div>

      <BottomButton onClick={()=>{
        localStorage.setItem("gender", selected);
        localStorage.setItem("genderTickets", String(tickets));
        localStorage.setItem("remainingTickets", String(remaining));
        router.push("/date");
      }}>Next</BottomButton>
    </main>
  );
}

function TicketPicker({tickets,setTickets}:any){
  return <div><p className="mb-4 text-2xl">Tickets</p><div className="flex justify-center gap-3">
    {[0,1,2,3,4].map(n=><button key={n} onClick={()=>setTickets(n)}
    className={`w-14 h-14 border-2 rounded-xl text-xl ${tickets===n?"bg-black text-white":"bg-white"}`}>{n}</button>)}
  </div></div>
}

function BottomButton({children,onClick}:any){
  return <div className="fixed bottom-4 left-0 w-full px-6">
    <button onClick={onClick} className="w-full bg-black text-white py-4 rounded-2xl text-xl">{children}</button>
  </div>
}
