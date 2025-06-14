import { ArrowRightCircle, CheckCircle2Icon, Share2Icon } from "lucide-react";
import React from "react";

interface ResponseSidebarProps {
  toolConfig: any;
  input: any;
  copyLink: () => void;
  linkCopied: boolean;
}

const OutputSidebar: React.FC<ResponseSidebarProps> = ({
  toolConfig,
  input,
  copyLink,
  linkCopied,
}) => {
  return (
    <aside className="md:mt-4 lg:col-span-4 lg:order-last lg:self-start lg:sticky lg:top-32">
      <div className="overflow-hidden bg-base-200 border rounded-xl border-base-300">
        <div className="px-4 p-6">
          <div className="flex flex-col justify-center lg:justify-center">
            <a
              className="mb-2 btn btn-accent text-accent-content"
              href={`${toolConfig.company.appUrl}`}
            >
              Generate another one
              <ArrowRightCircle className="w-6 h-6" />
            </a>

            <button
              className="btn btn-primary text-primary-content"
              onClick={copyLink}
            >
              Share this output
              <Share2Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
        {linkCopied && (
          <div className="mb-5 text-sm text-center text-green-500">
            Link copied to clipboard!
          </div>
        )}

        <div className="sm:p-6 p-4">
          <div className="pb-4">
            <h2 className="mb-2 text-sm font-bold tracking-widest text-base-content uppercase">
              Your input:
            </h2>
            <div className="relative w-full">
              {input && input.imageUrl && (
                <a href={input.imageUrl} target="_blank" rel="noreferrer">
                  <img
                    src={input.imageUrl}
                    alt="Image provided by user"
                    className="rounded-xl"
                  />
                </a>
              )}
              <div className="mt-2 overflow-x-auto">
                {toolConfig.fields.map((field: any) => (
                  <div key={field.name}>
                    <table className="table table-xs mb-2">
                      <thead>
                        <tr>
                          <th> {field.label}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> {input ? input[field.name] : ""}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default OutputSidebar;
