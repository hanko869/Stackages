import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { IconChevronRight } from "@tabler/icons-react";

export const Badge = ({
  text,
  href,
  onClick,
  className,
  icon: Icon = IconChevronRight,
  ...props
}: {
  text: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
  props?: React.ComponentProps<typeof Link>;
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "bg-slate-900 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-xl p-px text-xs font-medium leading-6 text-white inline-flex items-center",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      </span>
      <div className="relative flex items-center justify-between z-10 rounded-full bg-transparent py-2.5 px-4 ring-1 ring-white/10 w-full">
        <span>{text}</span>
        <Icon className="w-4 h-4" />
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
    </Link>
  );
};
