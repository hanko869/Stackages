"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRightCircle, Share2 } from "lucide-react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import Info from "@/components/alerts/Info";
import { ToolConfig } from "@/lib/types/toolconfig";
import { Heading } from "@/components/dashboard/Heading";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface DisplayOutputProps {
  toolConfig: ToolConfig;
  generationData: any;
}

export default function DisplayOutput({
  toolConfig,
  generationData,
}: DisplayOutputProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      generationData?.output_data &&
      typeof generationData.output_data === "object"
    ) {
      const output = generationData.output_data;
      let initialTab = "";
      if (
        "parameters" in output &&
        output.parameters &&
        typeof output.parameters === "object"
      ) {
        initialTab = Object.keys(output.parameters)[0] || "";
      } else {
        initialTab = Object.keys(output)[0] || "";
      }
      setActiveTab(initialTab);
    }
  }, [generationData]);

  if (!generationData) {
    return <Loading />;
  }

  const { output_data: output, input_data: input } = generationData;

  if (!output || typeof output !== "object") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-md mb-4">Oops, this page could not be found!</p>
        <Button onClick={() => router.back()} variant="default">
          Return
        </Button>
      </div>
    );
  }

  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 3000);
      })
      .catch((err) => console.error("Could not copy text: ", err));
  };

  const renderProperty = (propertyValue: any): JSX.Element => {
    if (propertyValue === null || propertyValue === undefined) {
      return (
        <div className="text-sm text-muted-foreground">
          Oops, this could not be found!
        </div>
      );
    }

    if (typeof propertyValue === "object" && !Array.isArray(propertyValue)) {
      // Handle imageUrl if present
      if (
        "imageUrl" in propertyValue &&
        typeof propertyValue.imageUrl === "string"
      ) {
        return (
          <a href={propertyValue.imageUrl} target="_blank" rel="noreferrer">
            <img
              src={propertyValue.imageUrl}
              alt="Image provided by user"
              className="rounded-xl max-w-md mb-4"
            />
          </a>
        );
      }

      return (
        <div className="space-y-4">
          {Object.entries(propertyValue).map(([key, value]) => (
            <div key={key}>
              <h4 className="text-sm font-semibold capitalize text-primary">
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </h4>
              {renderProperty(value)}
            </div>
          ))}
        </div>
      );
    }

    if (Array.isArray(propertyValue)) {
      return (
        <ul className="space-y-2 ml-4 list-disc">
          {propertyValue.map((item, index) => (
            <li key={index}>
              <span className="text-sm text-muted-foreground">
                {renderProperty(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    return <p className="text-sm text-muted-foreground">{propertyValue}</p>;
  };

  const handleGenerateAnother = () => {
    router.push(`${toolConfig.company.appUrl}`);
  };

  // Determine the tabs to display
  let tabs: string[] = [];
  let content: any = {};

  if ("parameters" in output && typeof output.parameters === "object") {
    // Use the keys within 'parameters' as tabs
    tabs = Object.keys(output.parameters);
    content = output.parameters;
  } else {
    // Use the keys within 'output' as tabs
    tabs = Object.keys(output);
    content = output;
  }

  return (
    <div className="min-h-screen">
      <Card className="mx-auto shadow-none border-none">
        <CardHeader>
          <Heading className="font-black">
            {generationData.title || "Generated Output"}
          </Heading>
          {generationData.subtitle && (
            <p className="text-muted-foreground">{generationData.subtitle}</p>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <Button
              variant="outline"
              className="hover:text-white"
              onClick={handleGenerateAnother}
            >
              Generate another one
              <ArrowRightCircle className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="hover:text-white"
              onClick={copyLink}
            >
              Share this output
              <Share2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
          {linkCopied && (
            <div className="mb-4 text-sm text-center text-green-500">
              Link copied to clipboard!
            </div>
          )}
          <Info>
            All output below is <strong>automatically rendered</strong> from the
            structured output of the AI model, no matter what the JSON structure
            looks like. This helps you quickly build MVPs & you can then
            customize and render the output in a more appealing way as desired.
          </Info>
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Your Input:</h3>
            {input && input.imageUrl && (
              <a href={input.imageUrl} target="_blank" rel="noreferrer">
                <img
                  src={input.imageUrl}
                  alt="Image provided by user"
                  className="rounded-xl max-w-md mb-4"
                />
              </a>
            )}
            <div className="bg-muted/50 p-4 text-sm rounded-md">
              {toolConfig.fields!.map((field) => (
                <div key={field.name} className="mb-2">
                  <span className="font-medium">{field.label}: </span>
                  <span>{input ? input[field.name] : ""}</span>
                </div>
              ))}
            </div>
          </div>
          {isMobile ? (
            // Render select dropdown on mobile devices
            <div className="mb-6">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {tabs.map((key) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="capitalize data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            // Render tabs on larger screens
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <ScrollArea className="w-full">
                <TabsList className="inline-flex h-9 items-center rounded-lg bg-muted p-1 text-muted-foreground w-full">
                  {tabs.map((key) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="capitalize inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
            </Tabs>
          )}
          {/* Content Rendering */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderProperty(content[activeTab])}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
