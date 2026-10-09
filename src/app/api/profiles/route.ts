import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { DesignProfile, INITIAL_PROFILES } from "@/types/profile";

const DATA_DIR = path.join(process.cwd(), "data");
const PROFILES_FILE = path.join(DATA_DIR, "profiles.json");

async function ensureProfilesFile(): Promise<DesignProfile[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const data = await fs.readFile(PROFILES_FILE, "utf-8");
      const profiles: DesignProfile[] = JSON.parse(data);
      if (Array.isArray(profiles) && profiles.length > 0) {
        return profiles;
      }
    } catch {
      // File doesn't exist or is invalid, initialize with default profiles
    }
    await fs.writeFile(PROFILES_FILE, JSON.stringify(INITIAL_PROFILES, null, 2), "utf-8");
    return INITIAL_PROFILES;
  } catch (error) {
    console.error("Failed to access profiles store:", error);
    return INITIAL_PROFILES;
  }
}

async function saveProfilesFile(profiles: DesignProfile[]): Promise<boolean> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(PROFILES_FILE, JSON.stringify(profiles, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Failed to save profiles to disk:", error);
    return false;
  }
}

export async function GET() {
  try {
    const profiles = await ensureProfilesFile();
    return NextResponse.json({ success: true, profiles }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json(
      { success: false, error: message, profiles: INITIAL_PROFILES },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, profile, profileId, expectedUpdatedAt } = body;

    let profiles = await ensureProfilesFile();

    if (action === "create") {
      if (!profile || !profile.id || !profile.name) {
        return NextResponse.json(
          { success: false, error: "Invalid profile data provided" },
          { status: 400 }
        );
      }

      // Check duplicate ID
      if (profiles.some((p) => p.id === profile.id)) {
        profile.id = `${profile.id}_${Date.now()}`;
      }

      const now = new Date().toISOString();
      const newProfile: DesignProfile = {
        ...profile,
        createdAt: now,
        updatedAt: now,
        modifiedBy: profile.modifiedBy || "Developer",
      };

      profiles.push(newProfile);
      await saveProfilesFile(profiles);
      return NextResponse.json({ success: true, profile: newProfile, profiles }, { status: 201 });
    }

    if (action === "update") {
      if (!profile || !profile.id) {
        return NextResponse.json(
          { success: false, error: "Profile ID is required for updates" },
          { status: 400 }
        );
      }

      const index = profiles.findIndex((p) => p.id === profile.id);
      if (index === -1) {
        return NextResponse.json(
          { success: false, error: "Profile not found" },
          { status: 404 }
        );
      }

      const existing = profiles[index];

      // Stale data check / concurrent edit warning
      if (
        expectedUpdatedAt &&
        existing.updatedAt &&
        new Date(existing.updatedAt).getTime() > new Date(expectedUpdatedAt).getTime() + 1000
      ) {
        return NextResponse.json(
          {
            success: false,
            error: `Conflict: Profile "${existing.name}" was updated by ${existing.modifiedBy} at ${new Date(
              existing.updatedAt
            ).toLocaleTimeString()}. Please refresh before saving.`,
            isConflict: true,
            serverProfile: existing,
          },
          { status: 409 }
        );
      }

      const updatedProfile: DesignProfile = {
        ...existing,
        ...profile,
        // Profile 1 (original) preserves original flag
        isOriginal: existing.isOriginal ?? false,
        updatedAt: new Date().toISOString(),
        modifiedBy: profile.modifiedBy || existing.modifiedBy || "Developer",
      };

      profiles[index] = updatedProfile;
      await saveProfilesFile(profiles);
      return NextResponse.json({ success: true, profile: updatedProfile, profiles }, { status: 200 });
    }

    if (action === "delete") {
      const targetId = profileId || profile?.id;
      if (!targetId) {
        return NextResponse.json(
          { success: false, error: "Profile ID required for deletion" },
          { status: 400 }
        );
      }

      const target = profiles.find((p) => p.id === targetId);
      if (target?.isOriginal) {
        return NextResponse.json(
          { success: false, error: "Profile 1 (Original Website) cannot be deleted." },
          { status: 403 }
        );
      }

      profiles = profiles.filter((p) => p.id !== targetId);
      await saveProfilesFile(profiles);
      return NextResponse.json({ success: true, profiles }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
