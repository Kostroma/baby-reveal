mkdir -p app/gender app/date app/weight app/time app/eyes app/hair app/done

cat > app/gender/page.tsx << 'EOT'
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
EOT

cat > app/date/page.tsx << 'EOT'
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const dates = Array.from({length:43},(_,i)=>{const d=new Date(2026,9,21); d.setDate(d.getDate()+i); return d;});

export default function DatePage(){
  const router = useRouter();
  const [index,setIndex]=useState(28);
  const [tickets,setTickets]=useState(0);
  const total=Number(localStorage.getItem("remainingTickets")||12);
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
EOT

cat > app/weight/page.tsx << 'EOT'
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WeightPage(){
  const router=useRouter();
  const [weight,setWeight]=useState(3200);
  const [tickets,setTickets]=useState(0);
  const total=Number(localStorage.getItem("remainingTickets")||12);
  const remaining=total-tickets;

  return <main className="min-h-screen px-6 pb-28 flex flex-col items-center justify-center text-center">
    <div className="max-w-md w-full space-y-8">
      <h1 className="text-4xl font-bold">Birth weight?</h1>
      <div className="text-5xl font-bold">{weight} g</div>
      <input className="w-full" type="range" min="2500" max="4500" step="50" value={weight} onChange={e=>setWeight(+e.target.value)} />
      <TicketPicker tickets={tickets} setTickets={setTickets}/>
      <p className="text-2xl text-gray-500">Remaining: {remaining}</p>
    </div>
    <BottomButton onClick={()=>{localStorage.setItem("weight",String(weight));localStorage.setItem("weightTickets",String(tickets));localStorage.setItem("remainingTickets",String(remaining));router.push("/time");}}>Next</BottomButton>
  </main>
}

function TicketPicker({tickets,setTickets}:any){return <div><p className="mb-4 text-2xl">Tickets</p><div className="flex justify-center gap-3">{[0,1,2,3,4].map(n=><button key={n} onClick={()=>setTickets(n)} className={`w-14 h-14 border-2 rounded-xl text-xl ${tickets===n?"bg-black text-white":"bg-white"}`}>{n}</button>)}</div></div>}
function BottomButton({children,onClick}:any){return <div className="fixed bottom-4 left-0 w-full px-6"><button onClick={onClick} className="w-full bg-black text-white py-4 rounded-2xl text-xl">{children}</button></div>}
EOT

cat > app/time/page.tsx << 'EOT'
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TimePage(){
  const router=useRouter();
  const [hour,setHour]=useState(12);
  const [tickets,setTickets]=useState(0);
  const total=Number(localStorage.getItem("remainingTickets")||12);
  const remaining=total-tickets;

  return <main className="min-h-screen px-6 pb-28 flex flex-col items-center justify-center text-center">
    <div className="max-w-md w-full space-y-8">
      <h1 className="text-4xl font-bold">Birth time?</h1>
      <div className="text-5xl font-bold">{String(hour).padStart(2,"0")}:00</div>
      <input className="w-full" type="range" min="0" max="23" value={hour} onChange={e=>setHour(+e.target.value)} />
      <TicketPicker tickets={tickets} setTickets={setTickets}/>
      <p className="text-2xl text-gray-500">Remaining: {remaining}</p>
    </div>
    <BottomButton onClick={()=>{localStorage.setItem("time",String(hour));localStorage.setItem("timeTickets",String(tickets));localStorage.setItem("remainingTickets",String(remaining));router.push("/eyes");}}>Next</BottomButton>
  </main>
}

function TicketPicker({tickets,setTickets}:any){return <div><p className="mb-4 text-2xl">Tickets</p><div className="flex justify-center gap-3">{[0,1,2,3,4].map(n=><button key={n} onClick={()=>setTickets(n)} className={`w-14 h-14 border-2 rounded-xl text-xl ${tickets===n?"bg-black text-white":"bg-white"}`}>{n}</button>)}</div></div>}
function BottomButton({children,onClick}:any){return <div className="fixed bottom-4 left-0 w-full px-6"><button onClick={onClick} className="w-full bg-black text-white py-4 rounded-2xl text-xl">{children}</button></div>}
EOT

cat > app/eyes/page.tsx << 'EOT'
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EyesPage(){
  const router=useRouter();
  const [selected,setSelected]=useState("Blue");
  const [tickets,setTickets]=useState(0);
  const total=Number(localStorage.getItem("remainingTickets")||12);
  const remaining=total-tickets;

  return <main className="min-h-screen px-6 pb-28 flex flex-col items-center justify-center text-center">
    <div className="max-w-md w-full space-y-8">
      <h1 className="text-4xl font-bold">Eye color?</h1>
      <Choice options={["Blue","Green","Hazel"]} selected={selected} setSelected={setSelected}/>
      <TicketPicker tickets={tickets} setTickets={setTickets}/>
      <p className="text-2xl text-gray-500">Remaining: {remaining}</p>
    </div>
    <BottomButton onClick={()=>{localStorage.setItem("eyes",selected);localStorage.setItem("eyesTickets",String(tickets));localStorage.setItem("remainingTickets",String(remaining));router.push("/hair");}}>Next</BottomButton>
  </main>
}

function Choice({options,selected,setSelected}:any){return <div className="flex gap-3 flex-wrap justify-center">{options.map((o:string)=><button key={o} onClick={()=>setSelected(o)} className={`px-6 py-4 border-2 rounded-2xl text-xl ${selected===o?"bg-black text-white":"bg-white"}`}>{o}</button>)}</div>}
function TicketPicker({tickets,setTickets}:any){return <div><p className="mb-4 text-2xl">Tickets</p><div className="flex justify-center gap-3">{[0,1,2,3,4].map(n=><button key={n} onClick={()=>setTickets(n)} className={`w-14 h-14 border-2 rounded-xl text-xl ${tickets===n?"bg-black text-white":"bg-white"}`}>{n}</button>)}</div></div>}
function BottomButton({children,onClick}:any){return <div className="fixed bottom-4 left-0 w-full px-6"><button onClick={onClick} className="w-full bg-black text-white py-4 rounded-2xl text-xl">{children}</button></div>}
EOT

cat > app/hair/page.tsx << 'EOT'
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HairPage(){
  const router=useRouter();
  const [selected,setSelected]=useState("Blonde");
  const [tickets,setTickets]=useState(0);
  const total=Number(localStorage.getItem("remainingTickets")||12);
  const remaining=total-tickets;

  return <main className="min-h-screen px-6 pb-28 flex flex-col items-center justify-center text-center">
    <div className="max-w-md w-full space-y-8">
      <h1 className="text-4xl font-bold">Birth hair color?</h1>
      <p className="text-gray-500">Birth hair color is not always final 👶</p>
      <Choice options={["Blonde","Ginger","Light Brown"]} selected={selected} setSelected={setSelected}/>
      <TicketPicker tickets={tickets} setTickets={setTickets}/>
      <p className="text-2xl text-gray-500">Remaining: {remaining}</p>
    </div>
    <BottomButton onClick={()=>{localStorage.setItem("hair",selected);localStorage.setItem("hairTickets",String(tickets));localStorage.setItem("remainingTickets",String(remaining));router.push("/done");}}>Finish</BottomButton>
  </main>
}

function Choice({options,selected,setSelected}:any){return <div className="flex gap-3 flex-wrap justify-center">{options.map((o:string)=><button key={o} onClick={()=>setSelected(o)} className={`px-6 py-4 border-2 rounded-2xl text-xl ${selected===o?"bg-black text-white":"bg-white"}`}>{o}</button>)}</div>}
function TicketPicker({tickets,setTickets}:any){return <div><p className="mb-4 text-2xl">Tickets</p><div className="flex justify-center gap-3">{[0,1,2,3,4].map(n=><button key={n} onClick={()=>setTickets(n)} className={`w-14 h-14 border-2 rounded-xl text-xl ${tickets===n?"bg-black text-white":"bg-white"}`}>{n}</button>)}</div></div>}
function BottomButton({children,onClick}:any){return <div className="fixed bottom-4 left-0 w-full px-6"><button onClick={onClick} className="w-full bg-black text-white py-4 rounded-2xl text-xl">{children}</button></div>}
EOT

cat > app/done/page.tsx << 'EOT'
export default function DonePage() {
  return (
    <main className="min-h-screen px-6 flex items-center justify-center text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Done 🎉</h1>
        <p className="text-xl text-gray-500">Your predictions are saved on this device.</p>
      </div>
    </main>
  );
}
EOT

echo "OK: all screens rewritten"
