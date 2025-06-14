import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import type { MDXComponents } from "mdx/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Hero from "@/components/blog/Hero";
import Info from "@/components/alerts/Info";
import Idea from "@/components/alerts/Idea";
import Image from "@/components/blog/Image";
import Card from "@/components/blog/Card";
import Check from "@/components/alerts/Check";
import Newsletter from "@/components/blog/Newsletter";
import { companyConfig } from "@/config";

// Custom MDX components.
const mdxComponents: MDXComponents = {
  a: ({ href, children }) => (
    <Link
      href={href as string}
      className="font-bold hover:underline"
      target="_blank"
    >
      {children}
    </Link>
  ),
  h1: (props) => <h1 className="text-4xl font-bold my-4" {...props} />,
  h2: (props) => <h2 className="text-xl font-bold my-3" {...props} />,
  h3: (props) => <h3 className="text-2xl font-bold my-2" {...props} />,
  p: (props) => <p className="text-base-content text-sm my-1" {...props} />,
  ul: (props) => (
    <ul className="list-disc text-base-content text-sm pl-5 my-2" {...props} />
  ),
  ol: (props) => (
    <ol
      className="list-decimal text-base-content text-sm pl-5 my-2"
      {...props}
    />
  ),
  img: (props) => <img className="my-4 mx-auto" {...props} />,
  code: (props) => <code className="bg-gray-200 p-1 px-2 rounded" {...props} />,

  // Additional components that can be used in blog posts:
  Info,
  Idea,
  Check,
  Image,
  Card,
  Newsletter,
};

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) {
    return;
  }

  const canonicalUrl = `${companyConfig.company.homeUrl}/blog/${params.slug}`;

  return {
    title: post.title,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      locale: "en_US",
      type: "article",
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.subtitle,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <Hero
        title={post.title}
        subtitle={post.subtitle}
        image={post.image}
        date={post.date}
      />

      <article className="p-2 sm:p-6 xl:max-w-3xl xl:mx-auto">
        <MDXContent components={mdxComponents} />
      </article>
    </>
  );
}
