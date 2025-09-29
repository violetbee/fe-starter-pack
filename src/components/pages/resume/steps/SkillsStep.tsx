import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { 
  addSkill, 
  removeSkill,
  setSkills,
  addLanguage,
  updateLanguage,
  removeLanguage,
  addCertificate,
  updateCertificate,
  removeCertificate,
  Skill,
  Language,
  Certificate
} from "@/store/slices/resumeSlice";
import { Plus, X, Award, Globe, Code } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SkillsStep() {
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.resume.skills);
  const languages = useSelector((state: RootState) => state.resume.languages);
  const certificates = useSelector((state: RootState) => state.resume.certificates);
  
  const [skillInput, setSkillInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("technical");
  const [isAddingLanguage, setIsAddingLanguage] = useState(false);
  const [isAddingCertificate, setIsAddingCertificate] = useState(false);
  
  const [languageForm, setLanguageForm] = useState<Omit<Language, "id">>({
    name: "",
    proficiency: "intermediate",
  });
  
  const [certificateForm, setCertificateForm] = useState<Omit<Certificate, "id">>({
    name: "",
    issuer: "",
    date: "",
    url: "",
  });

  const skillCategories = [
    { value: "technical", label: "Technical Skills", icon: <Code className="w-4 h-4" /> },
    { value: "soft", label: "Soft Skills", icon: null },
    { value: "tools", label: "Tools & Software", icon: null },
    { value: "other", label: "Other", icon: null },
  ];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim()) {
      const newSkill: Skill = {
        id: uuidv4(),
        name: skillInput.trim(),
        category: selectedCategory,
      };
      dispatch(addSkill(newSkill));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (id: string) => {
    dispatch(removeSkill(id));
  };

  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addLanguage({ ...languageForm, id: uuidv4() }));
    setLanguageForm({ name: "", proficiency: "intermediate" });
    setIsAddingLanguage(false);
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addCertificate({ ...certificateForm, id: uuidv4() }));
    setCertificateForm({ name: "", issuer: "", date: "", url: "" });
    setIsAddingCertificate(false);
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Expertise</h2>
        <p className="text-gray-600">Add your skills, languages, and certifications.</p>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        
        {/* Add Skill Form */}
        <form onSubmit={handleAddSkill} className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {skillCategories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  <div className="flex items-center gap-2">
                    {cat.icon}
                    {cat.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            className="flex-1"
            placeholder="Enter a skill (e.g., JavaScript, Project Management)"
          />
          <Button type="submit">
            Add Skill
          </Button>
        </form>

        {/* Skills Display by Category */}
        <div className="space-y-4">
          {skillCategories.map(category => {
            const categorySkills = getSkillsByCategory(category.value);
            if (categorySkills.length === 0) return null;
            
            return (
              <div key={category.value}>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  {category.icon}
                  {category.label}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map(skill => (
                    <span
                      key={skill.id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {skill.name}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="ml-1 hover:text-blue-900 h-5 w-5 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Languages Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Languages
          </h3>
          {!isAddingLanguage && (
            <Button
              variant="outline"
              onClick={() => setIsAddingLanguage(true)}
              className="flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Language
            </Button>
          )}
        </div>

        {isAddingLanguage && (
          <form onSubmit={handleAddLanguage} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language-name">Language</Label>
                <Input
                  id="language-name"
                  type="text"
                  value={languageForm.name}
                  onChange={(e) => setLanguageForm({ ...languageForm, name: e.target.value })}
                  placeholder="Language name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language-proficiency">Proficiency</Label>
                <Select 
                  value={languageForm.proficiency} 
                  onValueChange={(value) => setLanguageForm({ ...languageForm, proficiency: value as Language["proficiency"] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native">Native</SelectItem>
                    <SelectItem value="fluent">Fluent</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                Add Language
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingLanguage(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {languages.length > 0 && (
          <div className="grid md:grid-cols-2 gap-3">
            {languages.map(lang => (
              <div key={lang.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{lang.name}</span>
                  <span className="ml-2 text-sm text-gray-600">({lang.proficiency})</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(removeLanguage(lang.id))}
                  className="text-red-600 hover:text-red-700 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certifications
          </h3>
          {!isAddingCertificate && (
            <Button
              variant="outline"
              onClick={() => setIsAddingCertificate(true)}
              className="flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Certificate
            </Button>
          )}
        </div>

        {isAddingCertificate && (
          <form onSubmit={handleAddCertificate} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cert-name">Certificate Name</Label>
                <Input
                  id="cert-name"
                  type="text"
                  value={certificateForm.name}
                  onChange={(e) => setCertificateForm({ ...certificateForm, name: e.target.value })}
                  placeholder="Certificate name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cert-issuer">Issuing Organization</Label>
                <Input
                  id="cert-issuer"
                  type="text"
                  value={certificateForm.issuer}
                  onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })}
                  placeholder="Issuing organization"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cert-date">Date Obtained</Label>
                <Input
                  id="cert-date"
                  type="month"
                  value={certificateForm.date}
                  onChange={(e) => setCertificateForm({ ...certificateForm, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cert-url">Certificate URL (Optional)</Label>
                <Input
                  id="cert-url"
                  type="url"
                  value={certificateForm.url}
                  onChange={(e) => setCertificateForm({ ...certificateForm, url: e.target.value })}
                  placeholder="Certificate URL (optional)"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                Add Certificate
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingCertificate(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {certificates.length > 0 && (
          <div className="space-y-3">
            {certificates.map(cert => (
              <div key={cert.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{cert.name}</div>
                  <div className="text-sm text-gray-600">
                    {cert.issuer} • {cert.date}
                    {cert.url && (
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 hover:text-blue-700"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(removeCertificate(cert.id))}
                  className="text-red-600 hover:text-red-700 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
