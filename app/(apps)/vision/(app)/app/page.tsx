import InputCapture from "@/components/input/Input";
import PaymentModal from "@/components/paywall/Payment";
import { toolConfig } from "../../toolConfig";
import { UserGenerations } from "@/components/dashboard/UserTextGenerations";
import {
  getUserGenerations,
  getSession,
  getUserCredits,
} from "@/lib/db/cached-queries";
import InfoCard from "./info";

// The main page component where users can create new generations
export default async function Page() {
  // Check if a user is logged in
  const user = await getSession();

  // Set up variables to store user data
  let credits;
  let generations: any[] = [];

  // If someone is logged in...
  if (user?.email) {
    // If this tool requires payment...
    if (toolConfig.paywall) {
      // Check how many credits they have
      credits = await getUserCredits(user.id);

      // If they don't have enough credits, show the payment screen
      if (credits < toolConfig.credits) {
        return <PaymentModal />;
      }
    }

    // Get all their previous generations for this tool
    generations = await getUserGenerations(user.email, toolConfig.type);
  }

  // Show the main page with:
  // 1. The input form where users can create new generations
  // 2. A list of their previous generations
  return (
    <div data-theme={toolConfig.company.theme} className="bg-white">
      <InputCapture
        toolConfig={toolConfig}
        userEmail={user ? user.email : undefined}
        credits={toolConfig.paywall ? credits : undefined}
        emptyStateComponent={<InfoCard />}
      />
      <UserGenerations generations={generations} generationType="vision" />
    </div>
  );
}
