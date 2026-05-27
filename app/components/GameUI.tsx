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
