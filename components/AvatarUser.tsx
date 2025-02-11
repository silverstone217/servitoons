"use client";
import React from "react";
import lionImg from "@/public/images/lion.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarType = {
  username?: string | null;
  avatar?: string | null;
};

const AvatarUser = ({ username, avatar }: UserAvatarType) => {
  const avatarImg = avatar || lionImg.src;
  const shortName = username ? username.slice(0, 2).toUpperCase() : "NN";

  return (
    <Avatar>
      <AvatarImage src={avatarImg} />
      <AvatarFallback>{shortName}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarUser;
