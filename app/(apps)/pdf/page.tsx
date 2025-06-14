import PdfLayout from "@/components/pdf/PdfLayout";
import PaymentModal from "@/components/paywall/Payment";
import { toolConfig } from "./toolConfig";
import Section from "@/components/Section";
import {
  getSession,
  getUserCredits,
  getUserPdfDocuments,
} from "@/lib/db/cached-queries";

export default async function Page() {
  const user = await getSession();

  let credits;
  let documents;

  if (user) {
    if (toolConfig.paywall) {
      credits = await getUserCredits(user.id);

      if (credits < toolConfig.credits) {
        return <PaymentModal />;
      }
    }

    documents = await getUserPdfDocuments(user.id);
  }

  return (
    <>
      <PdfLayout
        userEmail={user ? user.email : undefined}
        documents={documents}
        credits={credits}
      />
    </>
  );
}
