import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { SidebarItem } from "./sidebarItem";
import { SidebarLogo } from "./sidebarLogo";
import { BiLogOut } from "react-icons/bi";
import { SidebarTweetButton } from "./sidebarTweetButton";

export const Sidebar = () => {
  const items = [
    //arr of objects
    {
      label: "Home",
      href: "/", // the directory
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications", // the directory
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: "/users/123", // the directory
      icon: FaUser,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />

          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}

          <SidebarItem onClick={() => {}} icon={BiLogOut} label="Logout" />

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};
