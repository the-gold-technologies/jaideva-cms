"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { SectionHeader } from "@/components/SectionHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SaveButton } from "@/components/SaveButton";
import { HelpCircle, Building, PhoneCall, Mail } from "lucide-react";

export interface LocateDistributorData {
  // Left Column - Find Right Lubricant
  heading: string;
  subheading: string;
  paragraph1: string;
  paragraph2: string;
  primaryBtnLabel: string;
  secondaryBtnLabel: string;

  // Right Column - Contact Card
  contactTitle: string;
  companyName: string;
  address: string;
  phone: string;
  workingHours: string;
  email: string;
  btn1Text: string;
  btn2Text: string;
}

export const DEFAULT_LOCATE_DISTRIBUTOR_DATA: LocateDistributorData = {
  heading: "",
  subheading: "",
  paragraph1: "",
  paragraph2: "",
  primaryBtnLabel: "",
  secondaryBtnLabel: "",
  contactTitle: "",
  companyName: "",
  address: "",
  phone: "",
  workingHours: "",
  email: "",
  btn1Text: "",
  btn2Text: "",
};

export function LocateDistributorSection({
  initialData,
}: {
  initialData?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"left" | "right">("left");
  const [formData, setFormData] = useState<LocateDistributorData>(
    DEFAULT_LOCATE_DISTRIBUTOR_DATA
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        heading:
          initialData.heading ||
          initialData.locateTitle ||
          initialData.title ||
          "",
        subheading:
          initialData.subheading ||
          initialData.locateSubtitle ||
          initialData.subtitle ||
          "",
        paragraph1:
          initialData.paragraph1 ||
          initialData.description ||
          initialData.locateSubtitle ||
          "",
        paragraph2:
          initialData.paragraph2 ||
          initialData.summaryText ||
          "",
        primaryBtnLabel:
          initialData.primaryBtnLabel ||
          initialData.searchButtonText ||
          initialData.btnLabel ||
          "",
        secondaryBtnLabel:
          initialData.secondaryBtnLabel ||
          initialData.contactButtonText ||
          "",
        contactTitle:
          initialData.contactTitle ||
          initialData.summaryTitle ||
          "",
        companyName:
          initialData.companyName ||
          initialData.searchResultCompany ||
          "",
        address:
          initialData.address ||
          initialData.searchResultAddress ||
          "",
        phone:
          initialData.phone ||
          initialData.searchResultPhone ||
          initialData.directPhone ||
          "",
        workingHours:
          initialData.workingHours ||
          "",
        email:
          initialData.email ||
          "",
        btn1Text:
          initialData.btn1Text ||
          initialData.buttonText ||
          initialData.btnLabel ||
          "",
        btn2Text:
          initialData.btn2Text ||
          initialData.secondaryButtonText ||
          "",
      });
    }
  }, [initialData]);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const payload = {
        ...formData,
        // Backward-compatibility keys for frontend consumers
        locateTitle: formData.heading,
        locateSubtitle: formData.paragraph1,
        title: formData.heading,
        subtitle: formData.subheading,
        searchResultCompany: formData.companyName,
        searchResultAddress: formData.address,
        searchResultPhone: formData.phone,
        contactButtonText: formData.secondaryBtnLabel,
        summaryTitle: formData.contactTitle,
        summarySubtitle: formData.subheading,
        summaryText: `${formData.paragraph1} ${formData.paragraph2}`,
      };

      const res = await fetch("/api/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "LocateDistributorSection",
          content: payload,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSaved(true);
        toast.success("Contact section saved successfully!");
        setTimeout(() => setSaved(false), 3000);
      } else {
        toast.error(json.error || "Failed to save");
      }
    } catch {
      toast.error("Error saving contact section");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-4 transition-all">
        <SectionHeader
          title="Contact & Application Section (Bottom)"
          description="Manage the Lubricant Application Assistance banner on the left and the Jai Deva Direct Contact card on the right."
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        />

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-6 pt-4">
              {/* Tab Selector */}
              <div className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-2xl w-fit border border-gray-200/80">
                <button
                  type="button"
                  onClick={() => setActiveTab("left")}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "left"
                      ? "bg-white text-[#0C356A] shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#C86218]" />
                  Lubricant Assistance (Left 68%)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("right")}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "right"
                      ? "bg-white text-[#0C356A] shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Building className="w-3.5 h-3.5 text-[#0C356A]" />
                  Contact Card (Right 32%)
                </button>
              </div>

              {/* Tab 1: Left Card (Lubricant Assistance) */}
              {activeTab === "left" && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label="Main Title (Uppercase)"
                      value={formData.heading}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          heading: e.target.value,
                        }))
                      }
                      placeholder="FIND THE RIGHT LUBRICANT FOR YOUR APPLICATION"
                    />

                    <InputField
                      label="Subheading (Orange Text)"
                      value={formData.subheading}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          subheading: e.target.value,
                        }))
                      }
                      placeholder="Looking for the Right Lubrication Solution?"
                    />
                  </div>

                  <TextAreaField
                    label="Paragraph 1"
                    rows={2}
                    value={formData.paragraph1}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        paragraph1: e.target.value,
                      }))
                    }
                    placeholder="Every machine and application has different lubrication requirements..."
                  />

                  <TextAreaField
                    label="Paragraph 2"
                    rows={2}
                    value={formData.paragraph2}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        paragraph2: e.target.value,
                      }))
                    }
                    placeholder="Whether you require Hydraulic Oil, Gear Oil, Engine Oil..."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Primary Button Label (Orange)"
                      value={formData.primaryBtnLabel}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          primaryBtnLabel: e.target.value,
                        }))
                      }
                      placeholder="Send Your Enquiry"
                    />

                    <InputField
                      label="Secondary Button Label (Navy)"
                      value={formData.secondaryBtnLabel}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          secondaryBtnLabel: e.target.value,
                        }))
                      }
                      placeholder="Talk to Our Team"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Right Card (Contact Details) */}
              {activeTab === "right" && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Contact Title"
                      value={formData.contactTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactTitle: e.target.value,
                        }))
                      }
                      placeholder="JAI DEVA OIL CO."
                    />
                    <InputField
                      label="Company Name"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      placeholder="Jai Deva Oil Co."
                    />
                  </div>

                  <InputField
                    label="Depot / Hub Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="Industrial Area & Distribution Hub, India"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Direct Contact Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="+91 98765 43210"
                    />
                    <InputField
                      label="Support / Sales Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="sales@jaidevaoil.com"
                    />
                  </div>

                  <InputField
                    label="Working Hours Text"
                    value={formData.workingHours}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: e.target.value,
                      }))
                    }
                    placeholder="Working Hours: Mon - Sat: 9:00 AM - 6:30 PM"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Button 1 Label (Orange)"
                      value={formData.btn1Text}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          btn1Text: e.target.value,
                        }))
                      }
                      placeholder="Send Enquiry"
                    />
                    <InputField
                      label="Button 2 Label (Navy)"
                      value={formData.btn2Text}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          btn2Text: e.target.value,
                        }))
                      }
                      placeholder="Become a Distributor"
                    />
                  </div>
                </div>
              )}

              {/* Full Width Save Changes Button */}
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
    </section>
  );
}
