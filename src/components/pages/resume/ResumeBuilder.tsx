import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/store";
import { setCurrentStep, nextStep, prevStep, saveToLocalStorage } from "@/store/slices/resumeSlice";
import TemplateSelection from "./steps/TemplateSelection";

import StepIndicator from "./components/StepIndicator";
import { ChevronLeft, ChevronRight, Eye, EyeOff, Home, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import ExperienceStep from "./steps/ExperienceStep";
import EducationStep from "./steps/EducationStep";
import SkillsStep from "./steps/SkillsStep";
import SummaryStep from "./steps/SummaryStep";
import FinalizeStep from "./steps/FinalizeStep";
import LivePreview from "./components/LivePreview";

const STEPS = [
  { id: 0, name: "Template", label: "Choose Template" },
  { id: 1, name: "Personal", label: "Personal Information" },
  { id: 2, name: "Experience", label: "Work Experience" },
  { id: 3, name: "Education", label: "Education" },
  { id: 4, name: "Skills", label: "Skills & Languages" },
  { id: 5, name: "Summary", label: "Professional Summary" },
  { id: 6, name: "Finalize", label: "Review & Download" },
];

export default function ResumeBuilder() {
  const dispatch = useDispatch();
  const resumeState = useSelector((state: RootState) => state.resume);
  const { currentStep, template } = resumeState;
  const [showPreview, setShowPreview] = useState(true);
  const [previewSize, setPreviewSize] = useState<"normal" | "maximized">(
    "normal"
  );

  // Auto-save to localStorage when state changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(saveToLocalStorage());
      console.log("Resume data saved to localStorage");
    }, 1000); // Debounce for 1 second

    return () => clearTimeout(timeoutId);
  }, [resumeState, dispatch]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <TemplateSelection />;
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <ExperienceStep />;
      case 3:
        return <EducationStep />;
      case 4:
        return <SkillsStep />;
      case 5:
        return <SummaryStep />;
      case 6:
        return <FinalizeStep />;
      default:
        return <TemplateSelection />;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      dispatch(nextStep());
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      dispatch(prevStep());
    }
  };

  const canProceed = () => {
    // Add validation logic for each step
    if (currentStep === 0 && !template) {
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => (window.location.href = "/")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">Home</span>
              </Button>
              <div className="h-5 w-px bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900">
                Create Your Resume
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              {currentStep > 0 && template && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center space-x-2"
                  >
                    {showPreview ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span>Hide Preview</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span>Show Preview</span>
                      </>
                    )}
                  </Button>
                  {showPreview && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setPreviewSize(
                          previewSize === "normal" ? "maximized" : "normal"
                        )
                      }
                    >
                      {previewSize === "normal" ? (
                        <Maximize2 className="w-4 h-4" />
                      ) : (
                        <Minimize2 className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-6 py-3">
          <StepIndicator steps={STEPS} currentStep={currentStep} />
        </div>
      </div>

      {/* Main Content with Split View */}
      <div className="flex h-[calc(100vh-150px)]">
        {/* Form Section */}
        <div
          className={`${showPreview && currentStep > 0 && template ? (previewSize === "normal" ? "w-2/3" : "w-1/3") : "w-full"} transition-all duration-300 overflow-y-auto bg-white border-r border-gray-100`}
        >
          <div className="max-w-5xl mx-auto p-8">{renderStep()}</div>

          {/* Navigation */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-4">
            <div className="max-w-3xl mx-auto flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="flex items-center space-x-2">
                {STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStep
                        ? "w-8 bg-blue-600"
                        : index < currentStep
                          ? "w-2 bg-green-600"
                          : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!canProceed() || currentStep === STEPS.length - 1}
                className="flex items-center space-x-2"
              >
                <span>
                  {currentStep === STEPS.length - 1 ? "Finish" : "Next"}
                </span>
                {currentStep < STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Live Preview Section */}
        {showPreview && currentStep > 0 && (
          <div
            className={`${previewSize === "normal" ? "w-1/3" : "w-2/3"} transition-all duration-300 bg-gray-50 overflow-hidden`}
          >
            <LivePreview size={previewSize} />
          </div>
        )}
      </div>
    </div>
  );
}
