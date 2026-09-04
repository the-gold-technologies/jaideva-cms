"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SaveButton } from "@/components/SaveButton";

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

export interface AboutJaiDevaContentData {
  mainTitle?: string;
  mentorSubHeader?: string;
  proprietorSubHeader?: string;
  paragraphs?: string[];
  whyChooseTitle?: string;
  whyChooseSubtitle?: string;
  whyChooseItems?: WhyChooseItem[];
}

export const DEFAULT_WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    icon: "Building2",
    title: "Multi-Brand Distributor",
    description: "Catering to diverse industrial and automotive sectors nationwide.",
  },
  {
    icon: "Boxes",
    title: "Wide Product Range",
    description: "Industrial oils, automotive lubricants, greases, and specialty fluids.",
  },
  {
    icon: "Wrench",
    title: "Technical Expertise",
    description: "Professional guidance for choosing the optimal grade and viscosity.",
  },
  {
    icon: "Truck",
    title: "Reliable & Swift Supply",
    description: "Consistent inventory availability with prompt delivery logistics.",
  },
  {
    icon: "ShieldCheck",
    title: "Quality-Focused Approach",
    description: "100% genuine lubricants tested for premium equipment performance.",
  },
  {
    icon: "Headphones",
    title: "Customer-Centric Service",
    description: "Dedicated support team ensuring long-term customer satisfaction.",
  },
];

export const DEFAULT_PARAGRAPHS = [
  "Established in the year 2008, Jai Deva Oil Co. is the leading prominent Wholesaler, Distributor, and Trader of Lubricants Oil, Engine Oil, Automotive Grease, Hydraulic Oil, Cutting Oil, Gear Oil, Rust Preventive Oil and much more. Made by making use of finest quality inputs altogether with superior machinery, these are very much-admired and recommended. Also, these are tested carefully before getting delivered at the end of our customers. To add, their effectiveness, these are enormously popular. Accessible with us in a plethora of sizes and packing, these could be purchased from us at most affordable costs.",
  "Our team of professionals keeps a check on clients' rising necessities and therefore aids us in meeting the same in certain period of time. Owing to our quality centric approach, we have been highly proficient to meet the desires of clients all over the marketplace. Also, we have with us a team of skilled and dexterous professionals who own years of expertise in this business realm.",
  "We are headed by our mentor Mr. Mayank Goyal, who has enormous knowledge and experience of the field. Owing to his balanced business plans and policies, we have attained a noteworthy position in the industry.",
];

export function AboutJaiDevaContentSection({
  initialData,
}: {
  initialData?: AboutJaiDevaContentData;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [mainTitle, setMainTitle] = useState("ABOUT JAI DEVA OIL CO.");
  const [mentorSubHeader, setMentorSubHeader] = useState(
    "Mr. Mayank Goyal – Mentor, Jai Deva Oil Co."
  );
  const [paragraphsText, setParagraphsText] = useState(
    DEFAULT_PARAGRAPHS.join("\n\n")
  );
  const [whyChooseTitle, setWhyChooseTitle] = useState(
    "WHY CHOOSE JAI DEVA OIL CO."
  );
  const [whyChooseSubtitle, setWhyChooseSubtitle] = useState(
    "Delivering Quality Lubricants. Building Trust Since 2008."
  );
  const [whyChooseItems, setWhyChooseItems] = useState<WhyChooseItem[]>(
    DEFAULT_WHY_CHOOSE_ITEMS
  );

  useEffect(() => {
    if (initialData) {
      if (initialData.mainTitle) setMainTitle(initialData.mainTitle);
      if (initialData.mentorSubHeader || initialData.proprietorSubHeader) {
        setMentorSubHeader(
          initialData.mentorSubHeader || initialData.proprietorSubHeader || ""
        );
      }
      if (Array.isArray(initialData.paragraphs)) {
        setParagraphsText(initialData.paragraphs.join("\n\n"));
      } else if (typeof initialData.paragraphs === "string") {
        setParagraphsText(initialData.paragraphs);
      }
      if (initialData.whyChooseTitle)
        setWhyChooseTitle(initialData.whyChooseTitle);
      if (initialData.whyChooseSubtitle)
        setWhyChooseSubtitle(initialData.whyChooseSubtitle);
      if (
        Array.isArray(initialData.whyChooseItems) &&
        initialData.whyChooseItems.length > 0
      ) {
        setWhyChooseItems(initialData.whyChooseItems);
      }
    }
  }, [initialData]);

  const handleWhyChooseChange = (
    index: number,
    field: keyof WhyChooseItem,
    val: string
  ) => {
    const updated = [...whyChooseItems];
    updated[index] = { ...updated[index], [field]: val };
    setWhyChooseItems(updated);
  };

  const handleAddWhyChoose = () => {
    setWhyChooseItems([
      ...whyChooseItems,
      {
        icon: "ShieldCheck",
        title: "",
        description: "",
      },
    ]);
  };

  const handleRemoveWhyChoose = (index: number) => {
    if (whyChooseItems.length <= 1) {
      toast.error("At least one highlight card is required.");
      return;
    }
    setWhyChooseItems(whyChooseItems.filter((_, idx) => idx !== index));
  };

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
        whyChooseTitle: whyChooseTitle.trim(),
        whyChooseSubtitle: whyChooseSubtitle.trim(),
        whyChooseItems,
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
        toast.success("About Jai Deva story & highlights saved successfully");
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

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6 transition-all">
      <SectionHeader
        title="2. About Jai Deva Oil Co. Story & Mentor Profile"
        description="Edit the detailed company background, mentor leadership, and the 'Why Choose Us' value pillars."
        badge={`${whyChooseItems.length} Pillars`}
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
                placeholder="e.g. Mr. Mayank Goyal – Mentor, Jai Deva Oil Co."
              />
            </div>

            {/* Paragraphs */}
            <TextAreaField
              label="Company Background & Mentorship Narrative"
              value={paragraphsText}
              onChange={(e) => setParagraphsText(e.target.value)}
              rows={8}
              placeholder="Enter paragraphs separated by blank lines..."
            />

            {/* Why Choose Section Divider */}
            <div className="pt-6 border-t border-gray-100 flex flex-col gap-5">
              <div className="flex items-center gap-2 text-[#0C356A]">
                <Sparkles className="w-5 h-5 text-[#C86218]" />
                <h3 className="text-base font-bold uppercase tracking-wider">
                  Why Choose Jai Deva Oil Co. Section
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Pillars Section Title"
                  value={whyChooseTitle}
                  onChange={(e) => setWhyChooseTitle(e.target.value)}
                  placeholder="e.g. WHY CHOOSE JAI DEVA OIL CO."
                />
                <InputField
                  label="Pillars Subtitle / Tagline"
                  value={whyChooseSubtitle}
                  onChange={(e) => setWhyChooseSubtitle(e.target.value)}
                  placeholder="e.g. Delivering Quality Lubricants. Building Trust Since 2008."
                />
              </div>

              {/* Dynamic Why Choose Cards */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Feature & Value Pillars ({whyChooseItems.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddWhyChoose}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C86218] hover:text-[#0C356A] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Pillar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {whyChooseItems.map((item, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gray-50/80 rounded-2xl border border-gray-200/70 flex flex-col gap-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500">
                          #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveWhyChoose(index)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all cursor-pointer"
                          title="Remove Pillar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <InputField
                        label="Pillar Title"
                        value={item.title}
                        onChange={(e) =>
                          handleWhyChooseChange(index, "title", e.target.value)
                        }
                        placeholder="e.g. Multi-Brand Distributor"
                      />

                      <TextAreaField
                        label="Description"
                        value={item.description}
                        onChange={(e) =>
                          handleWhyChooseChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={2}
                        placeholder="Brief summary of this advantage..."
                      />
                    </div>
                  ))}
                </div>
              </div>
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
