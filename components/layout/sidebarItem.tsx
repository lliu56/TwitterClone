import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon, // alias
  onClick,
  auth,
}) => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const loginModal = useLoginModal();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, loginModal]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div
        className="
    relative 
    rouded-full 
    h-14
    w-14
    flex 
    items-center
    justify-center
    p-4
    hover:bg-slate-300
    hover:bg-opacity-10
    cursor-pointer 
    lg:hidden
    "
      >
        <Icon size={28} color="white" />
      </div>

      <div
        className="
      relative 
      hidden
      lg:flex
      items-center
      gap-4
      p-4
      rounded-full
      hover:bg-slate-300
      hover: bg-opacity-10
      cursor-pointer
      "
      >
        <Icon size={24} color="white"></Icon>

        <p
          className="
        hidden lg:block text-white text-xl
        "
        >
          {label}
        </p>
      </div>
    </div>
  );
};
