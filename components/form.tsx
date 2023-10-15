import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./button";
import { Avatar } from "./avatar";
import { useCallback } from "react";
import usePost from "@/hooks/usePost";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId as string);
  const { mutate: mutatePost } = usePost(postId as string);

  // set state
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment
        ? `/api/commnents?postId = ${postId}`
        : "/api/posts";

      await axios.post("/api/posts", { body }); // making a post requests with axios

      toast.success("Tweet Created");
      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className=" flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="
              disabled:opacity-80
              peer
              resize-none
              mt-3
              w-full
              bg-black
              ring-0
              outline-none
              text-[20px]
              placeholder-netural-500
              text-white
              "
              placeholder={placeholder}
            ></textarea>

            <hr
              className="
            opcacity-0
            peer-focus:opacity-100
            h-[1px]
            w-full
            border-neutral-900
            transition
            "
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                label="Tweet"
                disabled={isLoading || !body}
                onClick={onSubmit}
              ></Button>
            </div>
          </div>
        </div>
      ) : (
        <div className=" py-8">
          <h1
            className="
        text-white
        text-2xl
        text-center
        mb-4
        font-bold
        "
          >
            Welcome to X{" "}
          </h1>

          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
