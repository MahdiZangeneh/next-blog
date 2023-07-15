import { useState } from "react";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import InfiniteScrollPosts from "../components/common/InfiniteScrollPosts";
import DefaultLayout from "../components/layout/DefaultLayout";
import { formatPosts, readPostsFromDb } from "../lib/utils";
import { PostDetail, UserProfile } from "../utils/types";
import axios from "axios";
import { filterPosts } from "../utils/helper";
import useAuth from "../hooks/useAuth";
import HotBlogs from "../components/common/HotBlogs";
import Banner from "../components/common/Banner";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(posts.length >= limit);

  const profile = useAuth();
  const isAdmin = profile && profile.role === "admin";

  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&skip=${postsToRender.length}`
      );
      if (data.posts.length < limit) {
        setPostsToRender([...postsToRender, ...data.posts]);
        setHasMorePosts(false);
      } else setPostsToRender([...postsToRender, ...data.posts]);
    } catch (error) {
      setHasMorePosts(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full hidden md:block">
        <Banner />
      </div>
      <DefaultLayout>
        <div className="max-w-6xl mx-auto">
          <HotBlogs posts={postsToRender} />
        </div>
        <div className="max-w-6xl mx-auto pb-20">
          <div className="border-b-4 dark:border-white border-black mt-7 pb-2 px-2 lg:px-0">
            <h3 className="font-semi-bold text-2xl text-primary-dark dark:text-primary">
              All Posts
            </h3>
          </div>
          <InfiniteScrollPosts
            hasMore={hasMorePosts}
            next={fetchMorePosts}
            dataLength={postsToRender.length}
            posts={postsToRender}
            showControls={isAdmin}
            onPostRemoved={(post) => setPostsToRender(filterPosts(posts, post))}
          />
        </div>
      </DefaultLayout>
    </>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
}

let pageNo = 0;
const limit = 9;

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async () => {
  try {
    // read posts
    const posts = await readPostsFromDb(limit, pageNo);
    // format posts
    const formattedPosts = formatPosts(posts);
    return {
      props: {
        posts: formattedPosts,
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};

export default Home;
