import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export default function Functions() {
  return (
    <>
      <div className="mt-8 mb-8 max-w-3xl mx-auto">
        <div className="max-md:px-8 max-w-3xl">
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2">
            We have bento grids.{" "}
            <p className="italic text-md font-light ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
              (add images, video & React components)
            </p>
          </h2>{" "}
          <p className="mt-4 md:mt-8 text-base-content max-w-[600px] mx-auto">
            Yes, you can add any React component to the grid. It's pretty cool.
            Thanks Aceternity UI.
          </p>
        </div>
      </div>{" "}
      <BentoGrid className="mb-32 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={
              i === 3 || i === 6
                ? "bg-primary/20 md:col-span-2"
                : "bg-primary/20"
            }
          />
        ))}
      </BentoGrid>
    </>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: (
      <div className="flex justify-center items-center">
        <video
          className="rounded-3xl w-full sm:w-[60rem] border-4 md:border-8 border-base-content/20"
          autoPlay
          muted
          loop
          playsInline
          controls
          width="1000"
        >
          <source
            src="https://d3cka28z30w0vx.cloudfront.net/newfulldemo.mp4"
            type="video/webm"
          />
          <source
            src="https://d3cka28z30w0vx.cloudfront.net/newfulldemo.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    ),
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
