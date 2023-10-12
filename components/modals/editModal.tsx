import useCurrentUser from "@/hooks/useCurrentUser";
import React, { useCallback, useEffect } from "react";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/userEditModal";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "../modal";
import { Input } from "../input";
import ImageUpload from "../imageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  // init
  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setBio(currentUser?.bio);
    setUsername(currentUser?.username);
  }, [
    currentUser?.name,
    currentUser?.coverImage,
    currentUser?.profileImage,
    currentUser?.username,
    currentUser?.bio,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      mutateFetchedUser();
      toast.success("Updated");
      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    name,
    username,
    profileImage,
    coverImage,
    editModal,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disable={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disable={isLoading}
        onChange={(coverImage) => setProfileImage(coverImage)}
        label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      ></Input>
      <Input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      ></Input>
      <Input
        placeholder="bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      ></Input>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit you profile"
      ActionLabel="Save"
      onSubmit={onSubmit}
      onClose={editModal.onClose}
      body={bodyContent}
    />
  );
};

export default EditModal;
