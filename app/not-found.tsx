import { Dock, DockIcon } from "@/components/magicui/dock";
import { IconMoneybag } from "@tabler/icons-react";
import { FileCodeIcon, HomeIcon, LaptopIcon } from "lucide-react";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <section className="relative bg-base-100 text-base-content h-screen w-full flex flex-col justify-center gap-8 items-center p-10">
      <div className="relative flex h-[500px] w-full max-w-[32rem] flex-col items-center justify-center overflow-hidden rounded-lg">
        <Image src="/404.png" width={512} height={244} alt="404 page" />
        <p className="text-lg md:text-xl font-semibold">
          Oops. This page does not exist.
        </p>
        <Dock>
          <DockIcon href="/">
            <HomeIcon className="h-6 w-6" />
          </DockIcon>
          <DockIcon href="https://docs.anotherwrapper.com">
            <FileCodeIcon className="h-6 w-6" />
          </DockIcon>
          <DockIcon href="https://anotherwrapper.lemonsqueezy.com/affiliates">
            <IconMoneybag className="h-6 w-6" />
          </DockIcon>

          <DockIcon href="https://apps.anotherwrapper.com/">
            <LaptopIcon className="h-6 w-6" />
          </DockIcon>
        </Dock>
      </div>
    </section>
  );
}
