import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ReactNode, ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckIcon } from "lucide-react";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  cta,
  points,
  hours,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: ReactElement;
  description: string;
  cta: string;
  points?: string[];
  hours: number;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <div
        key={name}
        className={cn(
          "cursor-pointer group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
          // "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          "bg-white border border-base-200 ",
          "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
          className
        )}
      >
        <div>{background}</div>
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
          {Icon}
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            {name}
          </h3>
          <p className="max-w-lg text-neutral-400">{description}</p>
        </div>
        <div
          className={cn(
            "absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          )}
        >
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="hover:bg-primary hover:text-white cursor-pointer"
          >
            <span>
              {cta} <ArrowRightIcon className="ml-2 h-4 w-4" />
            </span>
          </Button>
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
      </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{name}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {points && points.length > 0 && (
          <ul className="text-sm leading-6 text-muted-foreground">
            {points.map((point, index) => (
              <li key={index} className="flex gap-x-1">
                <CheckIcon className="h-6 w-5 flex-none text-green-500" />
                <span
                  className="text-neutral"
                  dangerouslySetInnerHTML={{ __html: point }}
                />
              </li>
            ))}
          </ul>
        )}
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export { BentoCard, BentoGrid };
