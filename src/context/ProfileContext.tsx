"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  DesignProfile,
  PageId,
  AnimationConfig,
  DEFAULT_PAGE_ANIMATION,
  INITIAL_PROFILES,
} from "@/types/profile";

interface ProfileContextType {
  profiles: DesignProfile[];
  activeProfileId: string;
  activeProfile: DesignProfile;
  activePage: PageId;
  activeConfig: AnimationConfig;
  isLoading: boolean;
  saveStatus: "idle" | "saving" | "saved" | "error";
  saveError: string | null;
  developerName: string;
  setDeveloperName: (name: string) => void;
  setActiveProfileId: (id: string) => void;
  createProfile: (
    name: string,
    description: string,
    sourceProfileId: string,
    developerName?: string
  ) => Promise<DesignProfile | null>;
  updateProfile: (profile: DesignProfile) => Promise<boolean>;
  deleteProfile: (id: string) => Promise<boolean>;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  refreshProfiles: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const LOCAL_STORAGE_ACTIVE_KEY = "scholars_active_profile_id";
const LOCAL_STORAGE_PROFILES_KEY = "scholars_cached_profiles";
const LOCAL_STORAGE_DEV_NAME_KEY = "scholars_dev_name";

function mapPathToPageId(pathname: string): PageId {
  if (pathname === "/" || pathname === "") return "landing";
  if (pathname.startsWith("/maths") || pathname.startsWith("/mathematics")) return "mathematics";
  if (pathname.startsWith("/physics")) return "physics";
  if (pathname.startsWith("/chemistry")) return "chemistry";
  if (pathname.startsWith("/biology")) return "biology";
  if (pathname.startsWith("/computer-science")) return "computer-science";
  return "landing";
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activePage = mapPathToPageId(pathname || "/");

  const [profiles, setProfiles] = useState<DesignProfile[]>(INITIAL_PROFILES);
  const [activeProfileId, setActiveProfileIdState] = useState<string>("profile-1");
  const [developerName, setDeveloperNameState] = useState<string>("Developer");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // Read initial cache from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const cachedActive = localStorage.getItem(LOCAL_STORAGE_ACTIVE_KEY);
      if (cachedActive) {
        setActiveProfileIdState(cachedActive);
      }

      const cachedDevName = localStorage.getItem(LOCAL_STORAGE_DEV_NAME_KEY);
      if (cachedDevName) {
        setDeveloperNameState(cachedDevName);
      }

      const cachedProfilesStr = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
      if (cachedProfilesStr) {
        const parsed = JSON.parse(cachedProfilesStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProfiles(parsed);
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  // Fetch shared profiles from API server
  const fetchSharedProfiles = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/profiles");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.profiles) && data.profiles.length > 0) {
          setProfiles(data.profiles);
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(data.profiles));
          }
        }
      }
    } catch (err) {
      console.warn("Using offline / cached profiles:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSharedProfiles();
  }, [fetchSharedProfiles]);

  const setActiveProfileId = (id: string) => {
    setActiveProfileIdState(id);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_KEY, id);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const setDeveloperName = (name: string) => {
    setDeveloperNameState(name);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_DEV_NAME_KEY, name);
    }
  };

  // Derive active profile & page config safely
  const activeProfile =
    profiles.find((p) => p.id === activeProfileId) ||
    profiles.find((p) => p.isOriginal) ||
    INITIAL_PROFILES[0];

  const activeConfig: AnimationConfig =
    activeProfile?.pages?.[activePage] || DEFAULT_PAGE_ANIMATION;

  const createProfile = async (
    name: string,
    description: string,
    sourceProfileId: string,
    authorName?: string
  ): Promise<DesignProfile | null> => {
    setSaveStatus("saving");
    setSaveError(null);

    const source = profiles.find((p) => p.id === sourceProfileId) || activeProfile;
    // Deep copy source page configurations
    const copiedPages: Record<PageId, AnimationConfig> = JSON.parse(
      JSON.stringify(source.pages || INITIAL_PROFILES[0].pages)
    );

    const newProfile: DesignProfile = {
      id: `profile-${Date.now()}`,
      name: name.trim() || `Custom Profile ${profiles.length + 1}`,
      description: description.trim() || `Experimental variation based on ${source.name}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      modifiedBy: authorName || developerName || "Developer",
      isOriginal: false,
      pages: copiedPages,
    };

    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          profile: newProfile,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const created = data.profile as DesignProfile;
        const updatedProfiles = data.profiles as DesignProfile[];
        setProfiles(updatedProfiles);
        setActiveProfileId(created.id);
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(updatedProfiles));
        }
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 3000);
        return created;
      } else {
        throw new Error(data.error || "Failed to create profile");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error creating profile";
      setSaveStatus("error");
      setSaveError(msg);
      return null;
    }
  };

  const updateProfile = async (updatedProfile: DesignProfile): Promise<boolean> => {
    setSaveStatus("saving");
    setSaveError(null);

    try {
      const existing = profiles.find((p) => p.id === updatedProfile.id);
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          profile: {
            ...updatedProfile,
            modifiedBy: developerName || updatedProfile.modifiedBy || "Developer",
          },
          expectedUpdatedAt: existing?.updatedAt,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const updatedList = data.profiles as DesignProfile[];
        setProfiles(updatedList);
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(updatedList));
        }
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 3000);
        return true;
      } else {
        throw new Error(data.error || "Failed to save profile changes");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Save failed";
      setSaveStatus("error");
      setSaveError(msg);
      return false;
    }
  };

  const deleteProfile = async (id: string): Promise<boolean> => {
    const target = profiles.find((p) => p.id === id);
    if (target?.isOriginal) {
      setSaveError("Original baseline profile cannot be deleted.");
      return false;
    }

    setSaveStatus("saving");
    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          profileId: id,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const updatedList = data.profiles as DesignProfile[];
        setProfiles(updatedList);
        if (activeProfileId === id) {
          setActiveProfileId("profile-1");
        }
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(updatedList));
        }
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 3000);
        return true;
      } else {
        throw new Error(data.error || "Failed to delete profile");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Delete failed";
      setSaveStatus("error");
      setSaveError(msg);
      return false;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        activeProfileId,
        activeProfile,
        activePage,
        activeConfig,
        isLoading,
        saveStatus,
        saveError,
        developerName,
        setDeveloperName,
        setActiveProfileId,
        createProfile,
        updateProfile,
        deleteProfile,
        isEditorOpen,
        setIsEditorOpen,
        isCreateModalOpen,
        setIsCreateModalOpen,
        refreshProfiles: fetchSharedProfiles,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
