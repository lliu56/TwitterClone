import { Header } from "@/components/layout/header";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { NotificationsFeed } from "@/components/notificationFeed";

export async function getServerProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
    return {
      props: {
        session,
      },
    };
  }
}
const Notifications = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
