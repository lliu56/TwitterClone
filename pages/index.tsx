import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import Form from "@/components/form";
import PostFeed from "@/components/posts/postFeed";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header label="home" />
      <Form placeholder="What's happening?"></Form>
      <PostFeed />
    </>
  );
}
