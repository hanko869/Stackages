import React, { useState, useEffect } from "react";
import Upload from "@/components/pdf/PDFUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Check from "@/components/alerts/Check";
import { UploadCloudIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface UploadDialogProps {
  fileUrl: string | null;
  fileName: string | null;
  setFileUrl: (url: string | null) => void;
  setFileName: (name: string | null) => void;
  handleUpload: (url: string | null, id: string | null) => Promise<void>;
  handleUrlSubmit: () => Promise<void>;
  status: string;
  response: any;
}

const UploadDialog: React.FC<UploadDialogProps> = ({
  fileUrl,
  fileName,
  setFileUrl,
  setFileName,
  handleUpload,
  handleUrlSubmit,
  status,
  response,
}) => {
  const [activeTab, setActiveTab] = useState<string>("Upload");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoading =
    status === "Adding document..." || status === "Generating embeddings...";

  if (!isMounted) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !isLoading && setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary/80 text-white"
        >
          <UploadCloudIcon className="w-4 h-4 mr-2" />
          Add new file
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="loading loading-ring loading-lg"></span>
            <p className="mt-4 text-sm text-black">
              Processing, please wait...
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Chat with a new PDF file</DialogTitle>
              <DialogDescription>
                Upload a PDF file from your device or add an external URL.
              </DialogDescription>
            </DialogHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-center items-center">
                <TabsList className="bg-primary text-white">
                  <TabsTrigger value="Upload">Upload</TabsTrigger>
                  <TabsTrigger value="URL">URL</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="Upload">
                {response && response.id ? (
                  <div>
                    <Check>Your PDF has been embedded successfully.</Check>
                  </div>
                ) : (
                  response && (
                    <div className="mt-4 p-4">
                      <h2 className="text-lg font-semibold">
                        There was an error
                      </h2>
                      <p className="mt-2 text-sm">
                        {JSON.stringify(response, null, 2)}
                      </p>
                    </div>
                  )
                )}
                {!response && (
                  <Upload setFileDetails={handleUpload} currentFile={fileUrl} />
                )}
              </TabsContent>
              <TabsContent value="URL">
                {!response && (
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="fileName" className="text-right">
                        Name
                      </Label>
                      <Input
                        type="text"
                        defaultValue="my-file.pdf"
                        className="col-span-3"
                        id="fileName"
                        name="fileName"
                        value={fileName || ""}
                        onChange={(e) => setFileName(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="fileUrl" className="text-right">
                        URL
                      </Label>
                      <Input
                        className="col-span-3"
                        type="text"
                        id="fileUrl"
                        name="fileUrl"
                        value={fileUrl || ""}
                        onChange={(e) => setFileUrl(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-primary hover:bg-primary/80 text-white"
                        onClick={handleUrlSubmit}
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
