import { redirect } from "next/navigation";
import Chat from "./chat";
import { toolConfig } from "../../toolConfig";
import PaymentModal from "@/components/paywall/Payment";
import {
  getSession,
  getUserCredits,
  getPdfDocumentById,
  getPdfConversationById,
} from "@/lib/db/cached-queries";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getSession();

  if (!user) {
    return redirect("/auth");
  }

  if (toolConfig.paywall) {
    const credits = await getUserCredits(user.id);

    if (credits < toolConfig.credits) {
      return <PaymentModal />;
    }
  }

  const currentDoc = await getPdfDocumentById(params.id);
  if (!currentDoc) {
    return <div>This document was not found</div>;
  }

  let initialMessages: any[] = [];
  if (currentDoc.conversation_id) {
    const data = await getPdfConversationById(currentDoc.conversation_id);
    if (data && data.conversation) {
      initialMessages = Array.isArray(data.conversation)
        ? data.conversation
        : [];
    }
  }

  return (
    <div data-theme={toolConfig.company.theme}>
      <Chat currentDoc={currentDoc} initialMessages={initialMessages} />
    </div>
  );
}
