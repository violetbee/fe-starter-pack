import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTemplate, ResumeTemplate } from "@/store/slices/resumeSlice";
import { Check } from "lucide-react";

const templates: {
  id: ResumeTemplate;
  name: string;
  description: string;
  preview: string;
}[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with a focus on readability",
    preview: "bg-gradient-to-br from-blue-50 to-indigo-50",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional layout that works for any industry",
    preview: "bg-gradient-to-br from-gray-50 to-slate-50",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Sophisticated design perfect for corporate positions",
    preview: "bg-gradient-to-br from-slate-50 to-zinc-50",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with a unique layout for creative fields",
    preview: "bg-gradient-to-br from-purple-50 to-pink-50",
  },
];

export default function TemplateSelection() {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector((state: RootState) => state.resume.template);

  const handleSelectTemplate = (templateId: ResumeTemplate) => {
    dispatch(setTemplate(templateId));
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">
          Select a template that best represents your professional style. You can change this later.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map(template => (
          <button
            key={template.id}
            onClick={() => handleSelectTemplate(template.id)}
            className={`relative rounded-lg border-2 transition-all ${
              selectedTemplate === template.id
                ? "border-blue-600 ring-2 ring-blue-100"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Selection indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 z-10">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            {/* Template Preview */}
            <div className={`h-64 rounded-t-lg ${template.preview}`}>
              {/* Mock Resume Preview */}
              <div className="p-4 space-y-2">
                <div className="w-full h-3 bg-white/60 rounded"></div>
                <div className="w-3/4 h-2 bg-white/40 rounded"></div>
                <div className="w-full h-2 bg-white/40 rounded mt-4"></div>
                <div className="w-full h-2 bg-white/40 rounded"></div>
                <div className="w-2/3 h-2 bg-white/40 rounded"></div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="h-2 bg-white/40 rounded"></div>
                  <div className="h-2 bg-white/40 rounded"></div>
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-4 bg-white rounded-b-lg">
              <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
