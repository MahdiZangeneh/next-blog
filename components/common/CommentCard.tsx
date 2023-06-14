import dateFormat from "dateformat";
import parse from "html-react-parser";
import { FC, ReactNode, useState } from "react";
import {
  BsFillReplyAllFill,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";
import { CommentResponse } from "../../utils/types";
import CommentFrom from "./CommentFrom";
import LikeHeart from "./LikeHeart";
import ProfileIcon from "./ProfileIcon";

interface Props {
  comment: CommentResponse;
  showControls: boolean;
  onUpdateSubmit?(content: string): void;
  onReplySubmit?(content: string): void;
  onDeleteClick?(): void;
  onLikeClick?(): void;
}

const CommentCard: FC<Props> = ({
  comment,
  showControls = false,
  onUpdateSubmit,
  onReplySubmit,
  onDeleteClick,
  onLikeClick,
}): JSX.Element => {
  const { owner, content, createdAt, likedByOwner, likes } = comment;
  const { name, avatar } = owner;
  const [showForm, setShowForm] = useState(false);
  const [initialState, setInitialState] = useState("");

  const displayReplyForm = () => {
    setInitialState("");
    setShowForm(true);
  };

  const hideReplyForm = () => {
    setShowForm(false);
  };

  const handleOnReplyClick = () => {
    displayReplyForm();
  };

  const handleOnEditClick = () => {
    displayReplyForm();
    setInitialState(content);
  };

  const handleCommentSubmit = (content: string) => {
    // means we want to update
    if (initialState) {
      onUpdateSubmit && onUpdateSubmit(content);
    } else {
      //means we want to reply
      onReplySubmit && onReplySubmit(content);
    }
    hideReplyForm();
  };

  return (
    <div className="flex space-x-3">
      <ProfileIcon
        avatar={avatar}
        nameInitial={name[0].toUpperCase()}
        lightOnly
      />
      <div className="flex-1">
        <h1 className="text-lg text-primary-dark dark:text-primary font-semibold">
          {name}
        </h1>
        <span className="text-sm text-secondary-dark">
          {dateFormat(createdAt, "d-mm-yyyy")}
        </span>
        <div className="text-primary-dark dark:text-primary">
          {parse(content)}
        </div>
        <div className="flex space-x-4">
          <LikeHeart
            liked={likedByOwner}
            label={likes + " likes"}
            onClick={onLikeClick}
          />
          <Button onClick={handleOnReplyClick}>
            <BsFillReplyAllFill />
            <span>Reply</span>
          </Button>
          {showControls && (
            <>
              <Button onClick={handleOnEditClick}>
                <BsPencilSquare />
                <span>Edit</span>
              </Button>
              <Button onClick={onDeleteClick}>
                <BsFillTrashFill />
                <span>Delete</span>
              </Button>
            </>
          )}
        </div>

        {showForm && (
          <div className="mt-3">
            <CommentFrom
              onSubmit={handleCommentSubmit}
              onClose={hideReplyForm}
              initialState={initialState}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;

interface ButtonProps {
  children: ReactNode;
  onClick?(): void;
}
const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-primary-dark dark:text-primary space-x-2"
    >
      {children}
    </button>
  );
};
