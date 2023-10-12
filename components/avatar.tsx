import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import Image from "next/image";
import { prependOnceListener } from "process";

interface AvatarProps {
  userId: string;
  islarge?: boolean;
  hasBorder?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  userId,
  islarge,
  hasBorder,
}) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation(); // override onClick element when clicking on avatar

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`${hasBorder ? "border-4 border-black" : ""}
        ${islarge ? "h-32" : "h-12"}
        ${islarge ? "w-32" : "w-12"}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative
        
  `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};
