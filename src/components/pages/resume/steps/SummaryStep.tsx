import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateSummary } from "@/store/slices/resumeSlice";
import { Lightbulb, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SummaryStep() {
  const dispatch = useDispatch();
  const summary = useSelector((state: RootState) => state.resume.summary);
  const personalInfo = useSelector((state: RootState) => state.resume.personalInfo);
  const experiences = useSelector((state: RootState) => state.resume.experiences);
  const [localSummary, setLocalSummary] = useState(summary);
  const [charCount, setCharCount] = useState(0);

  const maxChars = 500;

  useEffect(() => {
    setCharCount(localSummary.length);
  }, [localSummary]);

  const handleSummaryChange = (value: string) => {
    if (value.length <= maxChars) {
      setLocalSummary(value);
      dispatch(updateSummary(value));
    }
  };

  const sampleSummaries = [
    {
      title: "Experienced Professional",
      text: "Results-driven professional with over [X] years of experience in [industry/field]. Proven track record of [key achievement]. Skilled in [key skills] with a strong focus on [area of expertise]. Seeking to leverage expertise to contribute to [company type/goal].",
    },
    {
      title: "Recent Graduate",
      text: "Motivated and detail-oriented recent graduate with a [degree] in [field] from [university]. Strong foundation in [relevant skills/knowledge]. Passionate about [industry/field] with hands-on experience through [internships/projects]. Eager to apply academic knowledge and fresh perspectives to contribute to organizational success.",
    },
    {
      title: "Career Changer",
      text: "Versatile professional transitioning from [previous field] to [new field] with transferable skills in [relevant skills]. Combines [previous experience] with [new qualification/training] to bring unique perspective. Committed to leveraging diverse background to drive innovation and achieve organizational objectives.",
    },
  ];

  const getPositionFromExperiences = () => {
    if (experiences.length > 0 && experiences[0].current) {
      return experiences[0].position;
    }
    return "";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Summary</h2>
        <p className="text-gray-600">
          Write a brief summary that highlights your professional background and career objectives.
        </p>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-900">Tips for a Great Summary</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Keep it concise (2-4 sentences)</li>
              <li>• Highlight your most relevant experience and skills</li>
              <li>• Include your career goals or what you're seeking</li>
              <li>• Use action words and quantifiable achievements when possible</li>
              <li>• Tailor it to the job you're applying for</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Summary Textarea */}
      <div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="summary">
              Your Professional Summary
            </Label>
            <span className={`text-sm ${charCount > maxChars * 0.9 ? "text-orange-600" : "text-gray-500"}`}>
              {charCount}/{maxChars} characters
            </span>
          </div>
          <Textarea
            id="summary"
            value={localSummary}
            onChange={(e) => handleSummaryChange(e.target.value)}
            rows={6}
            placeholder={`${personalInfo.firstName ? personalInfo.firstName + ' is' : 'I am'} a ${getPositionFromExperiences() || '[your profession]'} with...`}
          />
        </div>
      </div>

      {/* Sample Summaries */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Sample Summaries for Inspiration
        </h3>
        <div className="space-y-3">
          {sampleSummaries.map((sample, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{sample.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{sample.text}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSummaryChange(sample.text)}
                className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
              >
                Use this template
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Fill Suggestions */}
      {personalInfo.firstName && experiences.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Quick Generate</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const currentPosition = experiences[0].position;
              const years = new Date().getFullYear() - new Date(experiences[0].startDate).getFullYear();
              const generatedSummary = `Experienced ${currentPosition} with ${years > 0 ? `over ${years} years` : 'proven experience'} in the industry. Skilled professional dedicated to delivering high-quality results and driving organizational success. Seeking new challenges to leverage expertise and contribute to innovative projects.`;
              handleSummaryChange(generatedSummary);
            }}
          >
            Generate based on your experience
          </Button>
        </div>
      )}
    </div>
  );
}
