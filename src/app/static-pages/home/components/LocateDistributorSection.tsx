"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { SectionHeader } from "@/components/SectionHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SaveButton } from "@/components/SaveButton";
import { MapPin, Building } from "lucide-react";

export interface LocateDistributorData {
  // Left Column - Locate Tool
  locateTitle: string;
  locateSubtitle: string;
  searchButtonText: string;
  searchResultCompany: string;
  searchResultAddress: string;
  searchResultPhone: string;

  // Right Column - Contact Details
  contactTitle: string;
  logo: string;
  companyName: string;
  address: string;
  phone: string;
  workingHours: string;
  email: string;
  contactButtonText: string;
}

export const DEFAULT_LOCATE_DISTRIBUTOR_DATA: LocateDistributorData = {
  locateTitle: "",
  locateSubtitle: "",
  searchButtonText: "",
  searchResultCompany: "",
  searchResultAddress: "",
  searchResultPhone: "",
  contactTitle: "",
  logo: "",
  companyName: "",
  address: "",
  phone: "",
  workingHours: "",
  email: "",
  contactButtonText: "",
};

export function LocateDistributorSection({
  initialData,
}: {
  initialData?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"locate" | "contact">("locate");
  const [formData, setFormData] = useState<LocateDistributorData>(
    DEFAULT_LOCATE_DISTRIBUTOR_DATA
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        locateTitle: initialData.locateTitle || initialData.heading || "",
        locateSubtitle: initialData.locateSubtitle || initialData.description || "",
        searchButtonText: initialData.searchButtonText || "",
        searchResultCompany: initialData.searchResultCompany || "",
        searchResultAddress: initialData.searchResultAddress || "",
        searchResultPhone: initialData.searchResultPhone || initialData.phone || "",
        contactTitle: initialData.contactTitle || "",
        logo: initialData.logo || "",
        companyName: initialData.companyName || "",
        address: initialData.address || "",
        phone: initialData.phone || initialData.directPhone || "",
        workingHours: initialData.workingHours || "",
        email: initialData.email || "",
        contactButtonText: initialData.contactButtonText || "",
      });
    }
  }, [initialData]);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const payload = {
        ...formData,
        // Backward-compatibility keys
        heading: formData.locateTitle,
        description: formData.locateSubtitle,
        phone: formData.phone,
        email: formData.email,
        workingHours: formData.workingHours,
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
        toast.success("Locate distributor & contact section saved!");
        setTimeout(() => setSaved(false), 3000);
      } else {
        toast.error(json.error || "Failed to save");
      }
    } catch {
      toast.error("Error saving section");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-4 transition-all">
        <SectionHeader
          title="Locate Distributor & Contact Hub"
          description="Manage the interactive dealer search tool on the left and the direct company contact details card on the right."
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
                  onClick={() => setActiveTab("locate")}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "locate"
                      ? "bg-white text-[#002749] shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#EB1E25]" />
                  Locate Dealer Tool (Left)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("contact")}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "contact"
                      ? "bg-white text-[#002749] shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Building className="w-3.5 h-3.5 text-[#002749]" />
                  Contact Card (Right)
                </button>
              </div>

              {/* Tab 1: Locate Dealer Tool */}
              {activeTab === "locate" && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                  <InputField
                    label="Search Section Heading"
                    value={formData.locateTitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        locateTitle: e.target.value,
                      }))
                    }
                    placeholder="LOCATE AN INDUSTRIAL LUBE DISTRIBUTOR (ILD)/ BAZAAR LUBE DISTRIBUTOR (BLD)"
                    helperText="Main uppercase heading in the search box"
                  />

                  <TextAreaField
                    label="Instructions / Subtitle"
                    rows={2}
                    value={formData.locateSubtitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        locateSubtitle: e.target.value,
                      }))
                    }
                    placeholder="Find the dealer of HP products in your area..."
                    helperText="Guidance text displayed above the search dropdowns"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Search Button Text"
                      value={formData.searchButtonText}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          searchButtonText: e.target.value,
                        }))
                      }
                      placeholder="SEARCH"
                    />
                    <InputField
                      label="Result Company Name"
                      value={formData.searchResultCompany}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          searchResultCompany: e.target.value,
                        }))
                      }
                      placeholder="Mahalaxmi Enterprises..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Result Region / Territory"
                      value={formData.searchResultAddress}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          searchResultAddress: e.target.value,
                        }))
                      }
                      placeholder="Baghpat Region & Surrounding Industrial Belts, Uttar Pradesh"
                    />
                    <InputField
                      label="Result Helpline Phone"
                      value={formData.searchResultPhone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          searchResultPhone: e.target.value,
                        }))
                      }
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Contact Card */}
              {activeTab === "contact" && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Contact Box Title"
                      value={formData.contactTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactTitle: e.target.value,
                        }))
                      }
                      placeholder="CONTACT DETAILS"
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
                      placeholder="Mahalaxmi Enterprises"
                    />
                  </div>

                  <InputField
                    label="Physical Office / Depot Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="Baghpat Region & Surrounding Industrial Belts, Uttar Pradesh, India."
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
                      placeholder="sales@mahalaxmienterprises.com"
                    />
                  </div>

                  <TextAreaField
                    label="Working Hours & Notice"
                    rows={2}
                    value={formData.workingHours}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: e.target.value,
                      }))
                    }
                    placeholder="Working Hours Monday to Saturday from 9.00 am to 6.00pm except for Public Holidays."
                  />

                  <InputField
                    label="Contact Action Button Text"
                    value={formData.contactButtonText}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        contactButtonText: e.target.value,
                      }))
                    }
                    placeholder="CONTACT US"
                  />
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
