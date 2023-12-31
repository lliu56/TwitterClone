import React from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { useState } from "react";
import { useCallback } from "react";
import { Input } from "../input";
import { Modal } from "../modal";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Result } from "postcss";
// import { error } from "console";

export const RegisterModal = () => {
  const LoginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    LoginModal.onOpen();
  }, [isLoading, registerModal, LoginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      // POST
      await axios.post("/api/register", {
        email,
        password,
        username,
        name,
      });

      toast.success("Account created");

      // working ??
      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch {
      console.log(Error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />

      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          {" "}
          Sign in
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      ActionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
