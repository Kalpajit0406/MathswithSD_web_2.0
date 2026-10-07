import { z } from "zod";

export const indianPhoneRegex = /^[6-9]\d{9}$/;

export const enquirySchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(2, { message: "Please enter the student's name (at least 2 characters)" })
    .max(100, { message: "Name cannot exceed 100 characters" }),

  parentPhone: z
    .string()
    .trim()
    .transform((val) => val.replace(/[\s\-()+]/g, "").replace(/^91/, ""))
    .refine((val) => indianPhoneRegex.test(val), {
      message: "Please enter a valid 10-digit Indian mobile number (e.g., 9830123456)",
    }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .or(z.literal(""))
    .optional(),

  studentClass: z.enum(["11", "12", "Repeater"], {
    message: "Please select a valid class (11, 12, or Repeater)",
  }),

  goal: z.enum(["Board Exam", "JEE", "WBJEE", "Board + Entrance"], {
    message: "Please select a target preparation goal",
  }),

  message: z
    .string()
    .trim()
    .max(1000, { message: "Message cannot exceed 1000 characters" })
    .optional(),

  // Honeypot field for spam prevention - humans leave this empty
  website_hp: z.string().max(0, { message: "Spam detected" }).optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.infer<typeof enquirySchema>;

export const CLASS_OPTIONS = [
  { value: "11", label: "Class 11 (Foundation & Boards)" },
  { value: "12", label: "Class 12 (Board Exam Mastery)" },
  { value: "Repeater", label: "Repeater / Dropper (Entrance Focus)" },
] as const;

export const GOAL_OPTIONS = [
  { value: "Board Exam", label: "Board Examination (WBCHSE / CBSE / ISC)" },
  { value: "JEE", label: "JEE Main & Advanced" },
  { value: "WBJEE", label: "WBJEE (West Bengal Joint Entrance)" },
  { value: "Board + Entrance", label: "Dual Focus (Board + JEE/WBJEE Combo)" },
] as const;
