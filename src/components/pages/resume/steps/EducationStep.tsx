import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { 
  addEducation, 
  updateEducation, 
  removeEducation,
  Education 
} from "@/store/slices/resumeSlice";
import { Plus, Edit2, Trash2, GraduationCap, Calendar, MapPin } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function EducationStep() {
  const dispatch = useDispatch();
  const education = useSelector((state: RootState) => state.resume.education);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, "id">>({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    current: false,
    location: "",
    gpa: "",
  });

  const resetForm = () => {
    setFormData({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      gpa: "",
    });
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      dispatch(updateEducation({ ...formData, id: editingId }));
    } else {
      dispatch(addEducation({ ...formData, id: uuidv4() }));
    }
    
    resetForm();
  };

  const handleEdit = (edu: Education) => {
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      startDate: edu.startDate,
      endDate: edu.endDate || "",
      current: edu.current,
      location: edu.location || "",
      gpa: edu.gpa || "",
    });
    setEditingId(edu.id);
    setIsAddingNew(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this education?")) {
      dispatch(removeEducation(id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-gray-600">Add your educational background, starting with your highest degree.</p>
      </div>

      {/* Education List */}
      {education.length > 0 && !isAddingNew && (
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h3>
                  <p className="text-gray-700 font-medium flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </span>
                    {edu.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </span>
                    )}
                    {edu.gpa && (
                      <span>GPA: {edu.gpa}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      {isAddingNew ? (
        <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution *
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Harvard University"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree *
              </label>
              <select
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select degree</option>
                <option value="High School Diploma">High School Diploma</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Professional Degree">Professional Degree</option>
                <option value="Certificate">Certificate</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study *
              </label>
              <input
                type="text"
                value={formData.fieldOfStudy}
                onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Computer Science"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="month"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date (or Expected)
              </label>
              <input
                type="month"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={formData.current}
              />
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: "" })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Currently studying here</span>
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Cambridge, MA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA
              </label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3.8/4.0"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingId ? "Update Education" : "Add Education"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </button>
      )}

      {education.length === 0 && !isAddingNew && (
        <p className="text-center text-gray-500 py-8">
          No education added yet. Click "Add Education" to get started.
        </p>
      )}
    </div>
  );
}
