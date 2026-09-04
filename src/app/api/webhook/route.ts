import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature") ?? "";

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Webhook signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await notifyBooking(session);
  }

  return NextResponse.json({ received: true });
}

async function notifyBooking(session: Stripe.Checkout.Session) {
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL   = process.env.NOTIFY_EMAIL;
  if (!RESEND_KEY || !TO_EMAIL) return;

  const meta = session.metadata ?? {};
  const customer = session.customer_details;
  const name  = customer?.name  ?? "—";
  const email = customer?.email ?? "—";
  const phone = customer?.phone ?? "—";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Rent Driver <notifications@rentdriver.fr>",
      to: [TO_EMAIL],
      subject: `✅ Course confirmée — ${meta.cityFrom} → ${meta.cityTo}`,
      html: `
        <h2>Nouvelle réservation confirmée</h2>
        <h3>Client</h3>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Nom</td><td>${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td>${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Téléphone</td><td>${phone}</td></tr>
        </table>
        <h3>Trajet</h3>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Trajet</td><td>${meta.cityFrom} → ${meta.cityTo}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Distance</td><td>${meta.distanceKm} km</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Prix payé</td><td>${meta.price} €</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Service</td><td>${meta.driverMode || "—"}</td></tr>
        </table>
        <p><a href="https://dashboard.stripe.com/payments/${session.payment_intent}">Voir dans Stripe →</a></p>
      `,
    }),
  });
}
