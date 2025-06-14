"use client";

import { Share2, Twitter, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

// Sharing utility
function getShareUrl(
  type: "twitter" | "linkedin" | "whatsapp",
  text: string,
  url: string
) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  switch (type) {
    case "twitter":
      return `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
  }
}

interface ShareButtonsProps {
  text: string;
  path: string;
  marginTop?: string;
  showShareText?: boolean;
}

export default function ShareButtons({
  text,
  path,
  marginTop = "mt-4",
  showShareText = true,
}: ShareButtonsProps) {
  const fullUrl = `https://anotherwrapper.com${path}`;

  return (
    <div
      className={`flex items-center gap-2 ${marginTop} pt-4 border-t border-gray-100`}
    >
      {showShareText && (
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Share2 className="w-4 h-4" /> Share:
        </span>
      )}
      <Button
        variant="ghost"
        size="sm"
        className="text-blue-400 hover:bg-blue-50 hover:text-blue-500"
        onClick={() =>
          window.open(getShareUrl("twitter", text, fullUrl), "_blank")
        }
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        onClick={() =>
          window.open(getShareUrl("linkedin", text, fullUrl), "_blank")
        }
      >
        <Linkedin className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-green-500 hover:bg-green-50 hover:text-green-600"
        onClick={() =>
          window.open(getShareUrl("whatsapp", text, fullUrl), "_blank")
        }
      >
        <FaWhatsapp className="w-4 h-4" />
      </Button>
    </div>
  );
}
