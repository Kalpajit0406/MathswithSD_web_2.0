"use client";

import React, { useState } from "react";
import {
  enquirySchema,
  CLASS_OPTIONS,
  GOAL_OPTIONS,
  type EnquiryInput,
} from "@/lib/validations/enquiry";
import { TeacherCharacter } from "../TeacherCharacter";

interface FormErrors {
  studentName?: string;
  parentPhone?: string;
  email?: string;
  studentClass?: string;
  goal?: string;
  message?: string;
  general?: string;
}

export function EnquirySection() {
  const [formData, setFormData] = useState<EnquiryInput>({
    studentName: "",
    parentPhone: "",
    email: "",
    studentClass: "11",
    goal: "Board Exam",
    message: "",
    website_hp: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    studentName: string;
    studentClass: string;
    goal: string;
  } | null>(null);

  const defaultWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919830000000";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change for the modified field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // 1. Client-side Zod validation
    const validation = enquirySchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: FormErrors = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormErrors] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Submit to Next.js API Route
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        if (json.errors) {
          setErrors(json.errors);
        } else {
          setErrors({ general: json.error || "Failed to submit enquiry. Please try again." });
        }
        return;
      }

      // 3. Mark Success
      setSubmittedData({
        studentName: formData.studentName,
        studentClass: formData.studentClass,
        goal: formData.goal,
      });
      setIsSuccess(true);
      setFormData({
        studentName: "",
        parentPhone: "",
        email: "",
        studentClass: "11",
        goal: "Board Exam",
        message: "",
        website_hp: "",
      });
    } catch (err: unknown) {
      console.error("Enquiry submission error:", err);
      setErrors({
        general: "Network connection error. Please check your internet or contact directly via WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp Pre-filled message generator
  const getWhatsAppLink = () => {
    if (!submittedData) return `https://wa.me/${defaultWhatsapp}`;
    const text = `Hello Soumen Sir! I am ${submittedData.studentName}. I have just submitted an admission enquiry for Class ${submittedData.studentClass} (${submittedData.goal}) coaching at MathsWithSD.`;
    return `https://wa.me/${defaultWhatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="enquiry-section"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-slate-900 text-white border-t border-slate-800 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-display text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            08 — ADMISSION &amp; ENQUIRY
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Take the First Step Toward{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-sky-400">
              Maths Mastery
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-2xl mx-auto">
            Book a seat in Soumen Sir&apos;s batch or schedule an academic consultation. Batches are kept small for personal attention.
          </p>
        </div>

        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Key Highlights & Teacher Character */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-950 border border-slate-800/80 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
                  Why Study With Soumen Sir?
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  Direct Mentorship, Zero Gimmicks.
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-300 font-body">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Small Batch Sizes:</strong> Strictly limited strength to ensure every student&apos;s doubts are addressed.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-400/10 border border-sky-400/30 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Rigorous Question Banks:</strong> Past 15 years WBCHSE, CBSE, JEE &amp; WBJEE problem archives.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Instant Doubt Support:</strong> Direct teacher access via WhatsApp &amp; post-class discussions.
                  </div>
                </div>
              </div>
            </div>

            {/* Character Visual */}
            <div className="mt-8 pt-6 border-t border-slate-900 flex items-center justify-between">
              <div className="text-xs text-slate-400 font-mono">
                <span>Classroom: Salt Lake / Kolkata</span>
                <div className="text-amber-400 font-bold mt-1">ADMISSIONS OPEN</div>
              </div>
              <TeacherCharacter pose="presenting" height={150} />
            </div>
          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl relative">
            
            {/* Success View */}
            {isSuccess ? (
              <div className="text-center py-10 px-4 space-y-6 animate-fade-in-card">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg">
                  ✓
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    Thank You, {submittedData?.studentName}!
                  </h3>
                  <p className="text-slate-300 font-body text-sm sm:text-base max-w-md mx-auto">
                    Your admission enquiry for <span className="text-amber-400 font-semibold">Class {submittedData?.studentClass}</span> ({submittedData?.goal}) has been sent to Soumen Sir.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-md mx-auto text-left text-xs text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Response time:</span>
                    <span className="text-white font-semibold">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Counseling mode:</span>
                    <span className="text-white font-semibold">Phone Call / WhatsApp</span>
                  </div>
                </div>

                {/* Instant WhatsApp Connect Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold px-7 py-3.5 text-sm transition-all shadow-xl hover:shadow-emerald-500/25"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Chat Directly on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-slate-700 hover:border-slate-500 text-slate-300 font-display text-sm font-semibold transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Enquiry Form View */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* General Alert / Error Banner */}
                {errors.general && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-body flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{errors.general}</span>
                  </div>
                )}

                {/* Honeypot field (hidden from real users) */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <label htmlFor="website_hp">Leave this field blank</label>
                  <input
                    type="text"
                    id="website_hp"
                    name="website_hp"
                    value={formData.website_hp || ""}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Row 1: Student Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Student Name */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="studentName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-display">
                      Student Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      required
                      placeholder="e.g., Anirban Roy"
                      value={formData.studentName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-500 text-sm font-body focus:outline-none focus:ring-2 transition-all ${
                        errors.studentName
                          ? "border-red-500 focus:ring-red-500/50"
                          : "border-slate-800 focus:border-amber-400 focus:ring-amber-400/20"
                      }`}
                    />
                    {errors.studentName && (
                      <p className="text-xs text-red-400 font-body">{errors.studentName}</p>
                    )}
                  </div>

                  {/* Parent / Guardian Phone */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="parentPhone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-display">
                      Parent / Phone <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-mono text-xs">
                        +91
                      </div>
                      <input
                        type="tel"
                        id="parentPhone"
                        name="parentPhone"
                        required
                        maxLength={15}
                        placeholder="9830123456"
                        value={formData.parentPhone}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 transition-all ${
                          errors.parentPhone
                            ? "border-red-500 focus:ring-red-500/50"
                            : "border-slate-800 focus:border-amber-400 focus:ring-amber-400/20"
                        }`}
                      />
                    </div>
                    {errors.parentPhone && (
                      <p className="text-xs text-red-400 font-body">{errors.parentPhone}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-display">
                      Email Address <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="student@example.com"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-500 text-sm font-body focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500/50"
                          : "border-slate-800 focus:border-amber-400 focus:ring-amber-400/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 font-body">{errors.email}</p>
                    )}
                  </div>

                  {/* Student Class */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="studentClass" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-display">
                      Class / Level <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="studentClass"
                        name="studentClass"
                        value={formData.studentClass}
                        onChange={handleChange}
                        className="w-full appearance-none px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-body focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all cursor-pointer"
                      >
                        {CLASS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Target Goal */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="goal" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-display">
                    Target Goal / Examination <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="goal"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full appearance-none px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-body focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all cursor-pointer"
                    >
                      {GOAL_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 4: Message / Specific Query */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-display">
                    Message / Queries <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell Soumen Sir about your current board, syllabus stage, or specific difficulties in maths..."
                    value={formData.message || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm font-body focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
                  />
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-display font-bold text-sm sm:text-base py-4 px-8 shadow-xl hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Submitting Your Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Admission Enquiry</span>
                        <svg className="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-[11px] text-slate-500 font-body">
                    🔒 Your contact details are kept strictly confidential for Soumen Sir&apos;s direct communications.
                  </p>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
