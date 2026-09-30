'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { SectionHeader } from '@/components/SectionHeader';
import { InputField } from '@/components/InputField';
import { TextAreaField } from '@/components/TextAreaField';
import { SaveButton } from '@/components/SaveButton';

export interface AboutSectionData {
  title: string;
  subtitle1: string;
  subtitle2: string;
  paragraph1: string;
  paragraph2: string;
  primaryBtnLabel: string;
  primaryBtnUrl: string;
  secondaryBtnLabel: string;
  secondaryBtnUrl: string;
}

export const DEFAULT_ABOUT_DATA: AboutSectionData = {
  title: '',
  subtitle1: '',
  subtitle2: '',
  paragraph1: '',
  paragraph2: '',
  primaryBtnLabel: '',
  primaryBtnUrl: '',
  secondaryBtnLabel: '',
  secondaryBtnUrl: '',
};

export function AboutSection({ initialData }: { initialData?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState<AboutSectionData>(DEFAULT_ABOUT_DATA);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        subtitle1: initialData.subtitle1 || '',
        subtitle2: initialData.subtitle2 || '',
        paragraph1: initialData.paragraph1 || '',
        paragraph2: initialData.paragraph2 || '',
        primaryBtnLabel: initialData.primaryBtnLabel || '',
        primaryBtnUrl: initialData.primaryBtnUrl || '',
        secondaryBtnLabel: initialData.secondaryBtnLabel || '',
        secondaryBtnUrl: initialData.secondaryBtnUrl || '',
      });
    }
  }, [initialData]);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const payload = {
        title: formData.title,
        subtitle1: formData.subtitle1,
        subtitle2: formData.subtitle2,
        paragraph1: formData.paragraph1,
        paragraph2: formData.paragraph2,
        primaryBtnLabel: formData.primaryBtnLabel,
        primaryBtnUrl: formData.primaryBtnUrl,
        secondaryBtnLabel: formData.secondaryBtnLabel,
        secondaryBtnUrl: formData.secondaryBtnUrl,
      };

      const res = await fetch('/api/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'AboutSection',
          content: payload,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSaved(true);
        toast.success('About section saved successfully');
        setTimeout(() => setSaved(false), 3000);
      } else {
        toast.error(json.error || 'Failed to save');
      }
    } catch {
      toast.error('Error saving about section');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-4 transition-all">
        <SectionHeader
          title="About Section Content"
          description="Manage the introductory overview, company division text, and action buttons on the homepage."
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        />

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-6 pt-4">
              {/* Section Heading */}
              <InputField
                label="Section Heading / Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="MULTI-BRAND LUBRICANT SOLUTIONS"
                helperText="Main title for the about section"
              />

              {/* Subtitles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Primary Subtitle (Orange Tagline)"
                  value={formData.subtitle1}
                  onChange={(e) => setFormData({ ...formData, subtitle1: e.target.value })}
                  placeholder="Multi-Brand Industrial & Automotive Lubricant Distributor"
                />

                <InputField
                  label="Secondary Subtitle"
                  value={formData.subtitle2}
                  onChange={(e) => setFormData({ ...formData, subtitle2: e.target.value })}
                  placeholder="Reliable Lubrication Solutions for Every Industry & Application"
                />
              </div>

              {/* Paragraphs */}
              <TextAreaField
                label="Paragraph 1 (Establishment & Background)"
                rows={3}
                value={formData.paragraph1}
                onChange={(e) => setFormData({ ...formData, paragraph1: e.target.value })}
                placeholder="Established in 2008, Jai Deva Oil Co. is a trusted Authorized Distributors..."
                helperText="First paragraph describing company heritage and authorized distributor status"
              />

              <TextAreaField
                label="Paragraph 2 (Product Scope & Applications)"
                rows={3}
                value={formData.paragraph2}
                onChange={(e) => setFormData({ ...formData, paragraph2: e.target.value })}
                placeholder="From Engine Oil, Hydraulic Oil and Gear Oil..."
                helperText="Second paragraph detailing product offerings and industry solutions"
              />

              {/* Primary Button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Primary Button Label"
                  value={formData.primaryBtnLabel}
                  onChange={(e) => setFormData({ ...formData, primaryBtnLabel: e.target.value })}
                  placeholder="Explore Products"
                />

                <InputField
                  label="Primary Button URL"
                  value={formData.primaryBtnUrl}
                  onChange={(e) => setFormData({ ...formData, primaryBtnUrl: e.target.value })}
                  placeholder="/products"
                  helperText="Destination link for explore products button"
                />
              </div>

              {/* Secondary Button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Secondary Button Label"
                  value={formData.secondaryBtnLabel}
                  onChange={(e) => setFormData({ ...formData, secondaryBtnLabel: e.target.value })}
                  placeholder="Contact Us"
                />

                <InputField
                  label="Secondary Button URL"
                  value={formData.secondaryBtnUrl}
                  onChange={(e) => setFormData({ ...formData, secondaryBtnUrl: e.target.value })}
                  placeholder="/contact-us"
                  helperText="Destination link for contact button"
                />
              </div>

              {/* Full Width Save Button */}
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
