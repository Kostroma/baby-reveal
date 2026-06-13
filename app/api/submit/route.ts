export async function POST(req: Request) {
  try {
    const data = await req.json();

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxGTxBnjoGkdMi2Qozi8qucTuRh5oK6RBMghNSrQHPedcgMiU4Skefy9rrJEsTxl-c/exec";
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      redirect: "follow",
    });

    const text = await res.text();

    if (!res.ok || !text.includes("ok")) {
      return Response.json(
        { ok: false, status: res.status, response: text },
        { status: 500 }
      );
    }

    return Response.json({ ok: true, response: text });
  } catch (e: any) {
    return Response.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
