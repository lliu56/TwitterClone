import { CommentItem } from "./CommentItem";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CurrentFeedProps> = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment: any) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
