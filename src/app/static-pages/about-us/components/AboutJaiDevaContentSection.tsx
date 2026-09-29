"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BookOpen } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SaveButton } from "@/components/SaveButton";

export function AboutJaiDevaContentSection({ initialData }: { initialData?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [mainTitle, setMainTitle] = useState("");
  const [mentorSubHeader, setMentorSubHeader] = useState("");
  const [paragraphsText, setParagraphsText] = useState("");

  useEffect(() => {
    if (initialData) {
      setMainTitle(initialData.mainTitle || initialData.title || "About Jai Deva Oil Co.");
      setMentorSubHeader(
        initialData.mentorSubHeader ||
          initialData.proprietorSubHeader ||
          initialData.subtitle ||
          "Mr. Mayank Goyal – Mentor & Proprietor, Jai Deva Oil Co."
      );
      if (Array.isArray(initialData.paragraphs)) {
        setParagraphsText(initialData.paragraphs.join("\n\n"));
      } else if (typeof initialData.paragraphs === "string") {
        setParagraphsText(initialData.paragraphs);
      }
    }
  }, [initialData]);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const paragraphs = paragraphsText
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean);

      const payload = {
        title: mainTitle.trim(),
        mainTitle: mainTitle.trim(),
        mentorSubHeader: mentorSubHeader.trim(),
        proprietorSubHeader: mentorSubHeader.trim(),
        subtitle: mentorSubHeader.trim(),
        paragraphs,
      };

      const res = await fetch("/api/about-us", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "AboutJaiDevaContent",
          content: payload,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSaved(true);
        toast.success("About Jai Deva story & mentor narrative saved successfully");
        setTimeout(() => setSaved(false), 3000);
      } else {
        toast.error(json.error || "Failed to save");
      }
    } catch {
      toast.error("Error saving about content");
    } finally {
      setLoading(false);
    }
  };

  const paragraphCount = paragraphsText
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean).length;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6 transition-all">
      <SectionHeader
        title="2. Company Story & Mentor Profile"
        description="Edit the detailed company background, mentor leadership, and company introduction paragraphs."
        badge={`${paragraphCount} Paragraphs`}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-8 pt-4">
            {/* Header Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Section Heading / Title"
                value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
                placeholder="e.g. ABOUT JAI DEVA OIL CO."
              />
              <InputField
                label="Mentor / Leadership Sub-header"
                value={mentorSubHeader}
                onChange={(e) => setMentorSubHeader(e.target.value)}
                placeholder="e.g. Mr. Mayank Goyal – Mentor & Proprietor, Jai Deva Oil Co."
              />
            </div>

            {/* Paragraphs */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#0C356A]">
                <BookOpen className="w-4 h-4 text-[#C86218]" />
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Company Background & Mentorship Narrative
                </label>
              </div>
              <TextAreaField
                label="Story Paragraphs (Separate distinct paragraphs with a blank empty line)"
                value={paragraphsText}
                onChange={(e) => setParagraphsText(e.target.value)}
                rows={8}
                placeholder="Enter paragraph 1...&#10;&#10;Enter paragraph 2...&#10;&#10;Enter paragraph 3..."
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <SaveButton
                loading={loading}
                saved={saved}
                onClick={handleSave}
                label="Save Changes"
                className="w-full py-3.5 text-sm font-bold shadow-sm hover:shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
