import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { PDFViewer } from "@react-pdf/renderer";
import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import { FileText, RefreshCw } from "lucide-react";

interface LivePreviewProps {
  size: "normal" | "maximized";
}

export default function LivePreview({ size }: LivePreviewProps) {
  const resumeData = useSelector((state: RootState) => state.resume);
  const [debouncedData, setDebouncedData] = useState(resumeData);
  const [manualRefreshKey, setManualRefreshKey] = useState(0);
  const [templateKey, setTemplateKey] = useState(
    resumeData.template || "modern"
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (resumeData.template && resumeData.template !== templateKey) {
      setTemplateKey(resumeData.template);
    }
  }, [resumeData.template, templateKey]);

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => {
      setDebouncedData(resumeData);
      setTimeout(() => setIsUpdating(false), 300);
    }, 600);

    return () => clearTimeout(timer);
  }, [resumeData]);

  const template = useMemo(() => {
    switch (debouncedData.template) {
      case "modern":
        return <ModernTemplate data={debouncedData} />;
      case "classic":
        return <ClassicTemplate data={debouncedData} />;
      case "professional":
        return <ProfessionalTemplate data={debouncedData} />;
      case "creative":
        return <CreativeTemplate data={debouncedData} />;
      default:
        return <ModernTemplate data={debouncedData} />;
    }
  }, [debouncedData]);

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Live Preview
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {debouncedData.template || "modern"} template
            </span>
          </div>
          <button
            onClick={() => setManualRefreshKey((prev) => prev + 1)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh preview"
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="flex-1 bg-gray-100 p-4">
        <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden relative">
          {/* Loading Overlay */}
          {isUpdating && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center transition-opacity duration-200">
              <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <div className="relative">
                  <div className="w-10 h-10 border-4 border-gray-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-700 font-medium">
                    Updating preview
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Please wait...</p>
                </div>
              </div>
            </div>
          )}

          <PDFViewer
            key={`${templateKey}-${manualRefreshKey}`}
            width="100%"
            height="100%"
            showToolbar={false}
            className="border-0"
          >
            {template}
          </PDFViewer>
        </div>
      </div>

      {/* Preview Footer */}
      <div className="bg-white border-t border-gray-100 px-4 py-2">
        <div className="flex items-center justify-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isUpdating ? "bg-orange-500 animate-pulse" : "bg-green-500"
            }`}
          />
          <p className="text-xs text-gray-500 text-center transition-colors duration-300">
            {isUpdating ? "Updating preview..." : "Preview is up to date"}
          </p>
        </div>
      </div>
    </div>
  );
}
