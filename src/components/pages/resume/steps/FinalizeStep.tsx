import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Download, Eye, FileText, Check, AlertCircle } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with @react-pdf
const PDFPreview = dynamic(() => import("../templates/PDFPreview"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
      <div className="text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">Loading preview...</p>
      </div>
    </div>
  ),
});

export default function FinalizeStep() {
  const resumeData = useSelector((state: RootState) => state.resume);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [previewMode, setPreviewMode] = useState<"preview" | "checklist">("checklist");

  const checklistItems = [
    {
      id: "template",
      label: "Template Selected",
      checked: !!resumeData.template,
      required: true,
    },
    {
      id: "personal",
      label: "Personal Information",
      checked: !!(resumeData.personalInfo.firstName && resumeData.personalInfo.lastName && resumeData.personalInfo.email),
      required: true,
    },
    {
      id: "contact",
      label: "Contact Details",
      checked: !!(resumeData.personalInfo.phone && resumeData.personalInfo.location),
      required: true,
    },
    {
      id: "experience",
      label: "Work Experience",
      checked: resumeData.experiences.length > 0,
      required: false,
    },
    {
      id: "education",
      label: "Education",
      checked: resumeData.education.length > 0,
      required: false,
    },
    {
      id: "skills",
      label: "Skills",
      checked: resumeData.skills.length > 0,
      required: false,
    },
    {
      id: "summary",
      label: "Professional Summary",
      checked: !!resumeData.summary,
      required: false,
    },
    {
      id: "photo",
      label: "Profile Photo",
      checked: !!resumeData.personalInfo.photo,
      required: false,
    },
  ];

  const requiredItemsComplete = checklistItems
    .filter(item => item.required)
    .every(item => item.checked);

  const completionPercentage = Math.round(
    (checklistItems.filter(item => item.checked).length / checklistItems.length) * 100
  );

  const getTemplate = () => {
    switch (resumeData.template) {
      case "modern":
        return <ModernTemplate data={resumeData} />;
      case "classic":
        return <ClassicTemplate data={resumeData} />;
      case "professional":
        return <ProfessionalTemplate data={resumeData} />;
      case "creative":
        return <CreativeTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  const fileName = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_CV.pdf`.replace(
    /\s+/g,
    "_"
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Download</h2>
        <p className="text-gray-600">
          Review your resume and download it as a PDF when you're ready.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Completion Status</h3>
          <span className={`text-2xl font-bold ${completionPercentage === 100 ? "text-green-600" : "text-blue-600"}`}>
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              completionPercentage === 100 ? "bg-green-600" : "bg-blue-600"
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        {!requiredItemsComplete && (
          <div className="flex items-center gap-2 text-orange-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Some required fields are incomplete</span>
          </div>
        )}
      </div>

      {/* View Toggle */}
      <div className="flex gap-3">
        <button
          onClick={() => setPreviewMode("checklist")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            previewMode === "checklist"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Checklist
        </button>
        <button
          onClick={() => setPreviewMode("preview")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            previewMode === "preview"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </span>
        </button>
      </div>

      {/* Content based on view mode */}
      {previewMode === "checklist" ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Resume Checklist</h3>
          <div className="space-y-2">
            {checklistItems.map(item => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  item.checked
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.checked ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <div className="w-5 h-5 rounded border-2 border-gray-300" />
                  )}
                  <span className={item.checked ? "text-gray-900" : "text-gray-600"}>
                    {item.label}
                    {item.required && (
                      <span className="ml-1 text-red-500">*</span>
                    )}
                  </span>
                </div>
                <span className={`text-sm ${item.checked ? "text-green-600" : "text-gray-500"}`}>
                  {item.checked ? "Complete" : "Incomplete"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <PDFPreview resumeData={resumeData} />
        </div>
      )}

      {/* Download Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Your Resume</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <p className="text-gray-700 mb-1">
                Your resume will be downloaded as a PDF file, ready to send to employers.
              </p>
              <p className="text-sm text-gray-600">
                Template: <span className="font-medium capitalize">{resumeData.template || "Not selected"}</span>
              </p>
            </div>
          </div>
          
          {requiredItemsComplete ? (
            <PDFDownloadLink
              document={getTemplate()}
              fileName={fileName}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {({ loading }) =>
                loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download PDF
                  </>
                )
              }
            </PDFDownloadLink>
          ) : (
            <button
              disabled
              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              Complete Required Fields
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
