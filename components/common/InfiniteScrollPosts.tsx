import axios from "axios";
import { FC, ReactNode, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDetail } from "../../utils/types";
import ButtonGroup from "./ButtonGroup";
import ConfirmModal from "./ConfirmModal";
import PostCard from "./PostCard";

interface Props {
  posts: PostDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
  onPostRemoved(post: PostDetail): void;
}
const buttonData = [
  { id: "all", label: "All Posts" },
  { id: "fix", label: "Fixes" },
  { id: "guide", label: "Guides" },
  { id: "update", label: "Updates" },
];

const activeButtonStyles =
  "text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800";
const inactiveButtonStyles =
  "text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800";

const InfiniteScrollPosts: FC<Props> = ({
  posts,
  showControls,
  hasMore,
  next,
  dataLength,
  loader,
  onPostRemoved,
}): JSX.Element => {
  const [postItems, setPostItems] = useState<PostDetail[]>(posts);
  const [removing, setRemoving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToRemove, setPostToRemove] = useState<PostDetail | null>(null);
  const [activeButton, setActiveButton] = useState("all");

  const handleOnDeleteClick = (post: PostDetail) => {
    setPostToRemove(post);
    setShowConfirmModal(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
  };

  const handleOnDeleteConfirm = async () => {
    if (!postToRemove) return handleDeleteCancel();

    setShowConfirmModal(false);
    setRemoving(true);
    const { data } = await axios.delete(`/api/posts/${postToRemove.id}`);

    if (data.removed) onPostRemoved(postToRemove);

    setRemoving(false);
  };

  const handleFilterPosts = (event: React.MouseEvent<HTMLButtonElement>) => {
    const tagId = event.currentTarget.id;
    setActiveButton(tagId);

    if (tagId === "all") {
      setPostItems(posts);
      return;
    }

    const filteredPosts = posts.filter((post) => post.tags.includes(tagId));
    setPostItems(filteredPosts);
  };

  const defaultLoader = (
    <p className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">
      Loading...
    </p>
  );

  return (
    <>
      <InfiniteScroll
        hasMore={hasMore}
        next={next}
        dataLength={dataLength}
        loader={loader || defaultLoader}
      >
        <div className="p-3">
          <ButtonGroup
            buttons={buttonData}
            activeButton={activeButton}
            onClick={handleFilterPosts}
          />
          <div className="grid sm:grid-col-2 md:grid-cols-3 gap-4">
            {postItems.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                controls={showControls}
                onDeleteClick={() => handleOnDeleteClick(post)}
                busy={post.id === postToRemove?.id && removing}
              />
            ))}
          </div>
        </div>
      </InfiniteScroll>
      <ConfirmModal
        visible={showConfirmModal}
        onClose={handleDeleteCancel}
        onCancel={handleDeleteCancel}
        onConfirm={handleOnDeleteConfirm}
        title="Are you sure?"
        subTitle="This action will remove this post permanently!"
        // busy
      />
    </>
  );
};

export default InfiniteScrollPosts;
