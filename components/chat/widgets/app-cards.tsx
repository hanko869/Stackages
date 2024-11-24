"use client";

import Link from "next/link";
import { apps } from "@/lib/ai/apps";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AppCardsProps {
  apps: typeof apps;
}

export function AppCards({ apps }: AppCardsProps) {
  if (!apps?.length) return null;

  return (
    <div className="flex gap-4 no-scrollbar overflow-x-auto pb-4 -mx-4 px-4">
      {apps.map((app) => (
        <Link
          key={app.href}
          href={app.href}
          target="_blank"
          className="flex-shrink-0 w-[320px] h-[240px] relative cursor-pointer border rounded-xl overflow-hidden group hover:border-border/60 transition-all duration-300 hover:-translate-y-0.5"
        >
          <img
            src={app.image}
            alt={app.title}
            className="w-full h-full object-cover absolute top-0 left-0"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <div className="w-full backdrop-blur-sm border border-neutral-200/50 rounded-lg p-4 text-white">
              <h2 className="text-sm font-medium leading-5 [text-shadow:0_4px_12px_rgba(0,0,0,0.6)]">
                {app.title}
              </h2>
              <p className="text-xs mt-1 [text-shadow:0_4px_12px_rgba(0,0,0,0.6)]">
                {app.shortDesc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {app.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={cn(
                      "[text-shadow:0_1px_3px_rgba(0,0,0,0.3)]",
                      "bg-white/20 text-white text-[10px] px-2 py-0.5"
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
