import RecordVoicePage from "@/components/audio/RecordAudio";
import PaymentModal from "@/components/paywall/Payment";
import { toolConfig } from "../../toolConfig";
import AudioInfo from "./info";
import YourFiles from "@/components/audio/YourFiles";
import Login from "@/components/input/login";
import {
  getSession,
  getUserCredits,
  getUserRecordings,
} from "@/lib/db/cached-queries";

export default async function Page() {
  const user = await getSession();

  let credits;
  let recordings;

  if (user) {
    if (toolConfig.paywall) {
      credits = await getUserCredits(user.id);

      if (credits < toolConfig.credits) {
        return <PaymentModal />;
      }
    }

    try {
      recordings = await getUserRecordings(user.id);
    } catch (error) {
      console.error("Error fetching recordings:", error);
      return <div>Error fetching recordings</div>;
    }
  }

  return (
    <>
      <div className="w-full flex flex-col md:flex-row items-start">
        <div className="w-full md:w-1/2">
          <AudioInfo />
        </div>
        {user ? (
          <>
            <div className="mt-5 w-full md:w-1/2">
              <RecordVoicePage user={user} />
              {recordings && recordings.length > 0 && (
                <div className="mt-8">
                  <YourFiles recordings={recordings} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="w-full md:w-1/2 px-2">
            <Login />
          </div>
        )}
      </div>
    </>
  );
}
