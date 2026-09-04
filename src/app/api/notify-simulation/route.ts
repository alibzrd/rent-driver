import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { cityFrom, cityTo, distanceKm, price, driverMode, hasPassengers } = await req.json();

    const RESEND_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL   = process.env.NOTIFY_EMAIL;

    if (!RESEND_KEY || !TO_EMAIL) return NextResponse.json({ ok: false });

    const serviceLabel =
      driverMode === "avec-voiture" ? "Chauffeur avec véhicule" : "Chauffeur sans voiture";
    const passengersLabel =
      hasPassengers === true ? "Avec passagers" : hasPassengers === false ? "Véhicule vide" : "—";

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rent Driver <notifications@rentdriver.fr>",
        to: [TO_EMAIL],
        subject: `🔍 Nouvelle simulation — ${cityFrom} → ${cityTo}`,
        html: `
          <h2>Nouvelle simulation de trajet</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;font-weight:bold">Trajet</td><td>${cityFrom} → ${cityTo}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Distance</td><td>${distanceKm} km</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Estimation</td><td>${price} €</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Service</td><td>${serviceLabel}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Passagers</td><td>${passengersLabel}</td></tr>
          </table>
        `,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
