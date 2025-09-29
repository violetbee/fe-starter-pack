import React from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { ResumeState } from "@/store/slices/resumeSlice";

import { Download } from "lucide-react";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
import CreativeTemplate from "./CreativeTemplate";

interface PDFPreviewProps {
  resumeData: ResumeState;
}

export default function PDFPreview({ resumeData }: PDFPreviewProps) {
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

  const fileName =
    `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_CV.pdf`.replace(
      /\s+/g,
      "_"
    );

  return (
    <div className="w-full">
      <div className="hidden">
        <PDFDownloadLink document={getTemplate()} fileName={fileName}>
          {({ loading }) => (
            <button id="pdf-download-trigger" disabled={loading}>
              {loading ? "Generating..." : "Download"}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      <PDFViewer width="100%" height="600" className="border-0">
        {getTemplate()}
      </PDFViewer>
    </div>
  );
}
