import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updatePersonalInfo } from "@/store/slices/resumeSlice";
import { useDropzone } from "react-dropzone";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PersonalInfoStep() {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: RootState) => state.resume.personalInfo);
  const [photoPreview, setPhotoPreview] = useState<string>(personalInfo.photo || "");

  const handleInputChange = (field: string, value: string) => {
    dispatch(updatePersonalInfo({ [field]: value }));
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPhotoPreview(base64String);
      dispatch(updatePersonalInfo({ photo: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoPreview("");
    dispatch(updatePersonalInfo({ photo: "" }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handlePhotoUpload(acceptedFiles[0]);
      }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Let's start with your basic information.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Photo Upload */}
        <div className="md:col-span-1">
          <Label className="mb-2">
            Profile Photo (Optional)
          </Label>
          {photoPreview ? (
            <div className="relative">
              <img
                src={photoPreview}
                alt="Profile"
                className="w-32 h-32 rounded-lg object-cover mx-auto"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={removePhoto}
                className="absolute top-0 right-0 -mt-2 -mr-2 rounded-full h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {isDragActive ? "Drop your photo here" : "Click or drag to upload"}
              </p>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                value={personalInfo.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="John"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name *
              </Label>
              <Input
                id="lastName"
                type="text"
                value={personalInfo.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john.doe@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              Location *
            </Label>
            <Input
              id="location"
              type="text"
              value={personalInfo.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="New York, NY"
              required
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Online Profiles (Optional)</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website">
                  Personal Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  value={personalInfo.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://johndoe.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={personalInfo.linkedin}
                  onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">
                  GitHub
                </Label>
                <Input
                  id="github"
                  type="url"
                  value={personalInfo.github}
                  onChange={(e) => handleInputChange("github", e.target.value)}
                  placeholder="https://github.com/johndoe"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
