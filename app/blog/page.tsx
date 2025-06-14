// app/page.tsx
import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

function PostCard(post: Post) {
  return (
    <div className="px-2 group">
      <div className="relative">
        <Link href={post.url}>
          <div className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
            <img
              src={post.image}
              alt=""
              className="border border-base-200 object-cover w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 transition-transform duration-300 transform group-hover:rotate-3 group-hover:scale-105 shadow-md group-hover:shadow-xl rounded-xl"
            />
          </div>
          <p className="mt-6 text-sm font-medium text-gray-500">
            <time
              dateTime={post.date}
              className="mb-2 block text-xs text-gray-600"
            >
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>
          </p>
          <p className="mt-4 text-md sm:text-xl font-bold leading-tight text-gray-900 xl:pr-8">
            {post.title}
          </p>
          <div className="mt-3 hover:underline font-medium flex flex-row">
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="ml-2 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div>
      <div className="mx-auto max-w-7xl py-8">
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="bg-base-100 max-md:px-8 max-w-3xl">
            <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-2">
              Build
              <span className="bg-primary text-white px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
                AI wrappers
              </span>
              in hours
            </h1>
            <p className="mt-4 md:mt-8 text-[#878787] max-w-[600px] mx-auto">
              Here come all your amazing blog posts. You can easily add new
              posts by creating new markdown files in the `blog` directory.{" "}
            </p>
          </div>
        </div>

        <div className="grid max-w-md grid-cols-2 mx-auto mt-12 sm:mt-16 md:grid-cols-3 lg:grid-cols-4 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none">
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </div>{" "}
    </div>
  );
}
