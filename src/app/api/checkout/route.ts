import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-04-22.dahlia",
    });
    const { price, cityFrom, cityTo, distanceKm, driverMode, hasPassengers } = await req.json();

    if (!price || !cityFrom || !cityTo) {
      return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? "http://localhost:3000";

    const serviceLabel =
      driverMode === "avec-voiture"
        ? "Chauffeur avec véhicule (VTC)"
        : "Chauffeur pour votre véhicule";
    const passengersLabel =
      hasPassengers === true ? " · Avec passagers" : hasPassengers === false ? " · Véhicule vide" : "";

    const session = await stripe.checkout.sessions.create({
      // PayPal must be enabled in Stripe Dashboard > Payment methods
      payment_method_types: ["card", "paypal"] as ("card" | "paypal")[],
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${serviceLabel} — ${cityFrom} → ${cityTo}`,
              description: `${distanceKm} km${passengersLabel} · Chauffeur professionnel`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&from=${encodeURIComponent(cityFrom)}&to=${encodeURIComponent(cityTo)}&km=${distanceKm}`,
      cancel_url: `${origin}/#simulator`,
      metadata: {
        cityFrom,
        cityTo,
        distanceKm: String(distanceKm),
        price: String(price),
        driverMode: driverMode ?? "",
        hasPassengers: hasPassengers != null ? String(hasPassengers) : "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Erreur lors de la création du paiement." }, { status: 500 });
  }
}
