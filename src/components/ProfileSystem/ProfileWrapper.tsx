"use client";

import React from "react";
import { ProfileProvider } from "@/context/ProfileContext";
import { CreateProfileModal } from "./CreateProfileModal";
import { VisualDesignEditor } from "./VisualDesignEditor";

export function ProfileWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      {children}
      <CreateProfileModal />
      <VisualDesignEditor />
    </ProfileProvider>
  );
}
