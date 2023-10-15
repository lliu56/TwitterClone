import Form from "@/components/form";
import { Header } from "@/components/layout/header";
import PostItem from "@/components/posts/postItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React, { useReducer } from "react";
import { ClipLoader } from "react-spinners";

const PostView = () => {
  const router = useRouter();

  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    <div className="flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>;
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />

      <Form postId={postId as string} isComment placeholder="Reply" />

      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
