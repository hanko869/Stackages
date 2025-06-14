"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import Link from "next/link";

type Props = {
  code: string;
};

function a({ href, children }: React.HTMLProps<HTMLAnchorElement>) {
  if (href && href.startsWith("/")) {
    return <Link href={href}>{children} next/link</Link>;
  }

  if (href && href.startsWith("#")) {
    return <a href={href}>{children} relative &lt;a&gt;</a>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} external &lt;a&gt;
    </a>
  );
}

export function MdxContent({ code }: Props) {
  const Component = useMDXComponent(code);

  return (
    <section className="prose prose-base prose-zinc max-w-none pb-4 pt-8 prose-headings:drop-shadow-sm prose-a:text-indigo-500 prose-a:no-underline hover:prose-a:text-indigo-300 hover:prose-a:underline prose-hr:border-zinc-300 prose-blockquote:border-l-zinc-300 prose-ul:my-4 prose-li:my-0 prose-li:marker:text-zinc-300">
      <Component components={{ a }} />
    </section>
  );
}
