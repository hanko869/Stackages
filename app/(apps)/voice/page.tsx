import Layout from "@/components/voice/Layout";
import PaymentModal from "@/components/paywall/Payment";
import { toolConfig } from "./toolConfig";
import {
  getSession,
  getUserCredits,
  getUserGenerations,
} from "@/lib/db/cached-queries";

export default async function Page() {
  // Get user session using cached query
  const user = await getSession();

  // Set up variables for user data
  let credits;
  let generations: any[] = [];

  if (user?.email) {
    if (toolConfig.paywall) {
      // Get credits using cached query
      credits = await getUserCredits(user.id);

      if (credits < toolConfig.credits) {
        return <PaymentModal />;
      }
    }

    // Get user generations using cached query
    generations = await getUserGenerations(user.email, toolConfig.type);
  }

  return (
    <>
      <Layout userEmail={user?.email} />
    </>
  );
}
