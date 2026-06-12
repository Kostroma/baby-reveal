"use client";
import { usePathname } from "next/navigation";

export function Frame() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <img
      src="/frame.png"
      alt=""
      aria-hidden
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ objectFit: "fill" }}
    />
  );
}
