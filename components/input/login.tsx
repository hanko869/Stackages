import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LogInIcon } from "lucide-react";

export default function Login() {
  return (
    <div className="flex justify-center items-center">
      <Alert>
        <LogInIcon className="h-4 w-4" />
        <AlertTitle>Login required</AlertTitle>
        <AlertDescription>
          Please{" "}
          <a href="/auth" className="font-bold hover:underline">
            log in
          </a>{" "}
          first to test out the demo app.
        </AlertDescription>
      </Alert>
    </div>
  );
}
