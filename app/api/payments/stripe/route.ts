import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import {
  checkUserProfile,
  updateUserProfile,
  updatePurchasesTable,
  addUserCredits,
} from "@/lib/db/payments";

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

// Ensure dynamic content generation for each request
export const dynamic = "force-dynamic";

/**
 * Handles POST requests for Stripe webhook events.
 * This function is responsible for processing Stripe webhook events,
 * particularly the 'checkout.session.completed' event.
 *
 * @param request - The incoming request object
 * @returns A JSON response indicating the result of the webhook processing
 */
export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    // Construct the Stripe event asynchronously
    event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle the 'checkout.session.completed' event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutSessionCompleted(session);
  }

  return NextResponse.json({ received: true });
}

/**
 * Processes a completed checkout session.
 * This function retrieves product information, updates the user's profile,
 * and records the purchase in the database.
 *
 * @param session - The completed Stripe Checkout Session object
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const userEmail = session.customer_details?.email;
  if (!userEmail) {
    console.log("No user email found in the session");
    return;
  }

  // Retrieve line items from the session
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

  if (lineItems.data.length === 0) {
    console.log("No line items found in the session");
    return;
  }

  // Get the first item (assuming one product per checkout)
  const item = lineItems.data[0];

  if (!item.price?.product) {
    console.log("No product information found in the line item");
    return;
  }

  // Extract the product ID
  const productId =
    typeof item.price.product === "string"
      ? item.price.product
      : item.price.product.id;

  let purchaseType: string | null = null;

  // Try to get purchase type from session metadata
  if (session.metadata && session.metadata.type) {
    purchaseType = session.metadata.type;
  }

  // If not found in session metadata, fetch product details
  if (!purchaseType) {
    const product = await stripe.products.retrieve(productId);

    if (product.metadata && product.metadata.type) {
      purchaseType = product.metadata.type;
    }
  }

  if (!purchaseType) {
    console.log("Unable to determine purchase type from metadata");
    return;
  }

  // Check if the user profile exists based on the email used for purchase
  const userProfile = await checkUserProfile(userEmail);

  // Record the purchase in the database
  await updatePurchasesTable(
    userEmail,
    session.id,
    session,
    purchaseType,
    "stripe"
  );

  if (!userProfile) {
    console.log(
      "No user found with this email, but purchase was stored in database!"
    );
    return;
  }

  // Update the user's profile with the new purchase type
  await updateUserProfile(userEmail, purchaseType);

  // Add credits for credit products
  if (purchaseType === "credits-small") {
    await addUserCredits(userEmail, 50);
  } else if (purchaseType === "credits-large") {
    await addUserCredits(userEmail, 100);
  }

  console.log("User profile updated successfully");
}
