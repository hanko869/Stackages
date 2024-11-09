"use client";

import { useState } from "react";
import Loading from "@/components/Loading";
import Section from "@/components/Section";
import { ToolConfig } from "@/lib/types/toolconfig";
import OutputHero from "@/components/output/OutputHero";
import OutputSidebar from "@/components/output/OutputSidebar";

interface Params {
  generationData: any;
  toolConfig: ToolConfig;
}

interface Output {
  creativeGrowthHacks?: {
    campaignName: string;
    description: string;
    expectedResults: string;
    trackingMetrics: string;
  }[];
  traditionalGrowthTactics?: {
    tacticName: string;
    specificActions: string[];
    expectedImpact: string;
    toolsRecommended?: string[];
    keywords?: string[];
  }[];
}

export default function ResponseLayout({ generationData, toolConfig }: Params) {
  const [selectedTab, setSelectedTab] = useState<"creative" | "traditional">(
    "creative"
  );
  const [linkCopied, setLinkCopied] = useState(false);

  if (!generationData) {
    return <Loading />;
  }

  const output = generationData.output_data as Output;
  const input = generationData.input_data;

  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 3000);
      })
      .catch((err) => console.error("Could not copy text: ", err));
  };

  return (
    <>
      <div
        className="relative min-h-screen"
        data-theme={toolConfig.company.theme}
      >
        <OutputHero
          title="Your marketing strategy has been generated! ✨"
          subtitle="Read below for more details. Good luck!"
          textColor="text-white"
        />
        <Section>
          <div className="flex flex-col md:flex-row" id="response">
            <div className="md:w-1/4">
              <OutputSidebar
                toolConfig={toolConfig}
                input={input}
                copyLink={copyLink}
                linkCopied={linkCopied}
              />
            </div>

            <div className="mt-10 md:-mt-5 flex flex-col ml-2 md:w-3/4">
              <div className="flex items-center justify-center space-x-2 mb-2 relative mx-auto mb-5">
                <div className="tabs bg-base-200 rounded-full p-1">
                  <a
                    className={`tab text-base-content ${
                      selectedTab === "creative"
                        ? "tab-active bg-primary text-white rounded-full"
                        : ""
                    }`}
                    onClick={() => setSelectedTab("creative")}
                  >
                    Creative
                  </a>
                  <a
                    className={`tab text-base-content ${
                      selectedTab === "traditional"
                        ? "tab-active bg-primary text-white rounded-full"
                        : ""
                    }`}
                    onClick={() => setSelectedTab("traditional")}
                  >
                    Traditional
                  </a>
                </div>
              </div>

              {selectedTab === "creative" && (
                <div className="overflow-x-auto bg-white border rounded-xl border-base-200 p-4">
                  <table className="table w-full">
                    <thead className="text-black">
                      <tr>
                        <th className="hidden md:table-cell">📊</th>
                        <th>👤 Campaign Name</th>
                        <th>📝 Description</th>
                        <th>📊 Results & Tracking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {output?.creativeGrowthHacks &&
                        output.creativeGrowthHacks.map((hack, index) => (
                          <tr
                            className="bg-gray-100 border-b"
                            key={`hack-${index}`}
                          >
                            <td className="hidden md:table-cell">
                              {index + 1}
                            </td>
                            <td>
                              <span className="font-bold">
                                {hack.campaignName}
                              </span>
                            </td>
                            <td>
                              <p className="text-xs italic">
                                {hack.description}
                              </p>
                            </td>
                            <td className="text-xs">
                              <p className="font-bold">✅ Expected Results:</p>
                              {hack.expectedResults}
                              <p className="mt-5 font-bold">
                                🔍 Tracking Metrics:
                              </p>
                              {hack.trackingMetrics}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedTab === "traditional" && (
                <div className="space-y-8">
                  {output?.traditionalGrowthTactics &&
                    output.traditionalGrowthTactics.map((tactic, tacticKey) => (
                      <div
                        className="overflow-x-auto bg-white border rounded-xl border-base-200 p-4"
                        key={`tactic-${tacticKey}`}
                      >
                        <h3 className="text-center text-2xl font-bold text-gray-700 mb-4">
                          {tactic.tacticName}
                        </h3>
                        <table className="table w-full">
                          <thead className="text-black">
                            <tr>
                              <th className="hidden md:table-cell">📊</th>
                              <th>🛠️ Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tactic.specificActions.map((action, index) => (
                              <tr
                                className="bg-gray-100 border-b"
                                key={`action-${index}`}
                              >
                                <td className="hidden md:table-cell">
                                  {index + 1}
                                </td>
                                <td className="italic text-xs">{action}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="mt-5 flex flex-col text-xs">
                          <div>
                            <table className="table w-full">
                              <thead className="text-black">
                                <tr>
                                  <th> ✅ Expected Impact</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-gray-100 border-b">
                                  <td className="italic text-xs">
                                    {tactic.expectedImpact}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          {tactic.toolsRecommended && (
                            <div className="mt-2 ml-4">
                              <p className="font-bold">🔍 Tools to use</p>
                              <ul className="list-inside list-disc ml-10">
                                {tactic.toolsRecommended.map((tool, index) => (
                                  <li key={index}>{tool}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {tactic.keywords && (
                            <div className="mt-2 ml-4">
                              <p className="font-bold">📝 Keywords to target</p>
                              <ul className="list-inside list-disc ml-10">
                                {tactic.keywords.map((keyword, index) => (
                                  <li key={index}>{keyword}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
