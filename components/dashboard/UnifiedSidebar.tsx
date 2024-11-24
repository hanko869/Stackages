"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { twMerge } from "tailwind-merge";
import {
  IconLayoutSidebarRightCollapse,
  IconChevronRight,
} from "@tabler/icons-react";
import { isMobile } from "@/lib/utils";
import { SidebarHistory } from "@/components/chat/sidebar/sidebar-history";
import { Badge } from "@/components/dashboard/Badge";
import { Heading } from "./Heading";

// Import navlinks from config
import { navlinks, freeTools, landingPages, otherLinks } from "./links";

interface UnifiedSidebarProps {
  user: User | null;
  showChatHistory?: boolean;
}

const NewBadge = () => (
  <span className="ml-2 inline-flex items-center rounded-lg bg-sky-500/10 px-1.5 py-0.5 text-[10px] font-medium text-sky-500 ring-1 ring-inset ring-sky-500/20">
    New
  </span>
);

const SidebarHeader = React.memo(() => (
  <Link className="px-2 mb-4" href="/">
    <Image
      src="/logo-text.png"
      alt="Logo"
      width={400}
      height={100}
      quality={100}
      className="w-full"
    />
  </Link>
));

SidebarHeader.displayName = "SidebarHeader";

export function UnifiedSidebar({
  user,
  showChatHistory = false,
}: UnifiedSidebarProps) {
  const [open, setOpen] = useState(!isMobile());
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const pathname = usePathname();

  const isActive = useCallback((href: string) => pathname === href, [pathname]);

  // Separate chat link from other navlinks
  const chatLink = navlinks.find((link) => link.label === "Chat AI");
  const otherNavlinks = navlinks.filter((link) => link.label !== "Chat AI");

  const renderLinks = useCallback(
    (links: any[], heading: string, defaultExternal: boolean = false) => (
      <>
        <Heading
          as="p"
          className="text-sm md:text-sm lg:text-sm px-2 pt-2 mb-2"
        >
          {heading}
        </Heading>

        {/* Always render Chat AI first in Demo Apps section */}
        {heading === "Demo Apps" && chatLink && (
          <>
            {showChatHistory ? (
              <div className="mb-1">
                <button
                  onClick={() => setIsChatExpanded(!isChatExpanded)}
                  className={twMerge(
                    "w-full text-primary hover:text-primary/50 transition duration-200 flex items-center justify-between py-2 px-4 rounded-md text-sm",
                    pathname.includes("/chat") &&
                      "bg-white shadow-lg text-primary"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <chatLink.icon
                      className={twMerge(
                        "h-4 w-4 flex-shrink-0",
                        pathname.includes("/chat") && "text-sky-500"
                      )}
                    />
                    <span>{chatLink.label}</span>
                    {chatLink.isNew && <NewBadge />}
                  </div>
                  <IconChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isChatExpanded ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {isChatExpanded && (
                  <div className="ml-4">
                    <SidebarHistory
                      user={user ?? undefined}
                      limit={3}
                      showAllHistory={showAllHistory}
                      setShowAllHistory={setShowAllHistory}
                    />
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={chatLink.href}
                prefetch={!chatLink.isExternal}
                target={chatLink.isExternal ? "_blank" : undefined}
                rel={chatLink.isExternal ? "noopener noreferrer" : undefined}
                onClick={() => isMobile() && setOpen(false)}
                className={twMerge(
                  "text-primary hover:text-primary/50 transition duration-200 flex items-center space-x-2 py-2 px-4 rounded-md text-sm",
                  isActive(chatLink.href) && "bg-white shadow-lg text-primary"
                )}
              >
                <chatLink.icon
                  className={twMerge(
                    "h-4 w-4 flex-shrink-0",
                    isActive(chatLink.href) && "text-sky-500"
                  )}
                />
                <span>{chatLink.label}</span>
                {chatLink.isNew && <NewBadge />}
              </Link>
            )}
          </>
        )}

        {/* Render other links */}
        {links.map((link) => {
          if (heading === "Demo Apps" && link.label === "Chat AI") return null;
          const isExternal = link.isExternal ?? defaultExternal;

          return (
            <Link
              key={link.href}
              href={link.href}
              prefetch={!isExternal}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (link.label === "Logout") {
                  e.preventDefault();
                  fetch(link.href, { method: "POST" }).then(() => {
                    window.location.href = "/auth";
                  });
                } else if (isMobile()) {
                  setOpen(false);
                }
              }}
              className={twMerge(
                "text-primary hover:text-primary/50 transition duration-200 flex items-center space-x-2 py-2 px-4 rounded-md text-sm",
                isActive(link.href) && "bg-white shadow-lg text-primary"
              )}
            >
              <link.icon
                className={twMerge(
                  "h-4 w-4 flex-shrink-0",
                  isActive(link.href) && "text-sky-500"
                )}
              />
              <span>{link.label}</span>
              {link.isNew && <NewBadge />}
            </Link>
          );
        })}
      </>
    ),
    [
      isActive,
      isChatExpanded,
      pathname,
      user,
      showChatHistory,
      showAllHistory,
      setShowAllHistory,
    ]
  );

  const handleBadgeClick = () => {
    if (isMobile()) setOpen(false);
  };

  return (
    <>
      <div className={`lg:block ${open ? "block" : "hidden"}`}>
        <div className="px-3 z-40 pb-4 bg-neutral-100 w-[220px] fixed lg:relative h-screen left-0 flex flex-col justify-between">
          <div className="flex-1 overflow-auto no-scrollbar">
            <SidebarHeader />

            <div className="flex flex-col space-y-1 relative z-40">
              <div className="flex flex-col">
                {renderLinks(navlinks, "Demo Apps")}
                {renderLinks(landingPages, "Landing Pages", true)}
                {renderLinks(freeTools, "Free Tools", true)}
                {renderLinks(otherLinks, "Other", true)}
              </div>
            </div>
          </div>

          <div className="pb-4">
            <div onClick={handleBadgeClick}>
              <Badge
                href="https://anotherwrapper.lemonsqueezy.com/buy/c1a15bd7-58b0-4174-8d1a-9bca6d8cb511"
                text="Build your startup"
                icon={IconChevronRight}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className="fixed lg:hidden bottom-4 right-4 h-8 w-8 border border-neutral-200 rounded-full backdrop-blur-sm flex items-center justify-center z-40"
        onClick={() => setOpen(!open)}
      >
        <IconLayoutSidebarRightCollapse className="h-4 w-4 text-primary" />
      </button>
    </>
  );
}
