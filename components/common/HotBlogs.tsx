import Link from "next/link";
import Image from "next/image";

import { FC } from "react";
import { PostDetail } from "../../utils/types";

interface Props {
  posts: PostDetail[];
}

const HotBlogs: FC<Props> = ({ posts }): JSX.Element => {
  const [postLgOne, postLgTwo, postSmOne, postSmTwo, postSmThree] = posts;

  return (
    <div className="grid sm:grid-cols-3 gap-1">
      <div className="sm:col-span-3 grid sm:grid-cols-2 gap-1">
        <div className="col-span-1">
          <article className="relative aspect-video overflow-hidden rounded">
            <Link href={"/" + postLgOne.slug}>
              <a
                className={`block w-full h-full transition-transform hover:scale-110 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 `}
              >
                <Image
                  src={postLgOne.thumbnail!}
                  alt={postLgOne.title}
                  layout="fill"
                />
                <div className="absolute inset-0 bg-gradient-animation-v1"></div>
              </a>
            </Link>
            <h2 className="absolute font-bold text-white bottom-0 p-5 text-lg z-10">
              {postLgOne.title}
            </h2>
          </article>
        </div>
        <div className="col-span-1">
          <article className="relative aspect-video overflow-hidden rounded">
            <Link href={"/" + postLgTwo.slug}>
              <a
                className={`block w-full h-full transition-transform hover:scale-110 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 `}
              >
                <Image
                  src={postLgTwo.thumbnail!}
                  alt={postLgTwo.title}
                  layout="fill"
                />
                <div className="absolute inset-0 bg-gradient-animation-v2"></div>
              </a>
            </Link>
            <h2 className="absolute font-bold text-white bottom-0 p-5 text-lg z-10">
              {postLgTwo.title}
            </h2>
          </article>
        </div>
      </div>
      <div className="col-span-1">
        <article className="relative aspect-video overflow-hidden rounded">
          <Link href={"/" + postSmOne.slug}>
            <a
              className={`block w-full h-full transition-transform hover:scale-110 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 `}
            >
              <Image
                src={postSmOne.thumbnail!}
                alt={postSmOne.title}
                layout="fill"
              />
              <div className="absolute inset-0 bg-gradient-animation-v3"></div>
            </a>
          </Link>
          <h2 className="absolute font-bold text-white bottom-0 p-5 text-lg z-10">
            {postSmOne.title}
          </h2>
        </article>
      </div>
      <div className="col-span-1">
        <article className="relative aspect-video overflow-hidden rounded">
          <Link href={"/" + postSmTwo.slug}>
            <a
              className={`block w-full h-full transition-transform hover:scale-110 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 `}
            >
              <Image
                src={postSmTwo.thumbnail!}
                alt={postSmTwo.title}
                layout="fill"
              />
              <div className="absolute inset-0 bg-gradient-animation-v4"></div>
            </a>
          </Link>
          <h2 className="absolute font-bold text-white bottom-0 p-5 text-lg z-10">
            {postSmTwo.title}
          </h2>
        </article>
      </div>
      <div className="col-span-1">
        <article className="relative aspect-video overflow-hidden rounded">
          <Link href={"/" + postSmTwo.slug}>
            <a
              className={`block w-full h-full transition-transform hover:scale-110 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 `}
            >
              <Image
                src={postSmThree.thumbnail!}
                alt={postSmThree.title}
                layout="fill"
              />
              <div className="absolute inset-0 bg-gradient-animation-v5"></div>
            </a>
          </Link>
          <h2 className="absolute font-bold text-white bottom-0 p-5 text-lg z-10">
            {postSmThree.title}
          </h2>
        </article>
      </div>
    </div>
  );
};

export default HotBlogs;
