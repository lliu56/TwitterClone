import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { Avatar } from "../avatar";

interface CommentItemProps {
  data: Record<string, any>; // object?
}

export const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropgation();

      router.push(`/users/${data.user.id} `);

      if (!data?.createAt) {
        return null;
      }

      return formatDistanceToNowStrict(new Date(data.createAt));
    },
    [data?.createAt]
  );

  return (
    <div
      className="
    border-b-[1px]
    border-neutral-800
    p-5
    cursor-pointer
    hover:bg-neutral-900
    transition 
    "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-white
                font-semibold
                cursor-pointer
                hover:underline
                "
            >
              {data.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @ {data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{data?.createdAt}</span>
          </div>
          <div
            className="
          text-white mt-1
          "
          ></div>
        </div>
      </div>
    </div>
  );
};
