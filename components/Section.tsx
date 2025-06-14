import { ReactNode } from "react";

export default function Section({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="p-2 sm:p-6 xl:max-w-7xl xl:mx-auto">
        {children}
      </section>
    </>
  );
}
