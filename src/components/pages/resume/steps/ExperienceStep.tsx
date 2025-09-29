import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { 
  addExperience, 
  updateExperience, 
  removeExperience,
  Experience 
} from "@/store/slices/resumeSlice";
import { Plus, Edit2, Trash2, Calendar, MapPin } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function ExperienceStep() {
  const dispatch = useDispatch();
  const experiences = useSelector((state: RootState) => state.resume.experiences);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, "id">>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    location: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      description: "",
    });
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      dispatch(updateExperience({ ...formData, id: editingId }));
    } else {
      dispatch(addExperience({ ...formData, id: uuidv4() }));
    }
    
    resetForm();
  };

  const handleEdit = (experience: Experience) => {
    setFormData({
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate,
      endDate: experience.endDate || "",
      current: experience.current,
      location: experience.location || "",
      description: experience.description,
    });
    setEditingId(experience.id);
    setIsAddingNew(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      dispatch(removeExperience(id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
        <p className="text-gray-600">Add your professional experience, starting with the most recent.</p>
      </div>

      {/* Experience List */}
      {experiences.length > 0 && !isAddingNew && (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
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
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Senior Software Engineer"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tech Company Inc."
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
                End Date
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
                <span className="text-sm text-gray-600">I currently work here</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="New York, NY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={5}
              placeholder="Describe your responsibilities and achievements..."
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Tip: Use bullet points to list your achievements. Start each point with an action verb.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingId ? "Update Experience" : "Add Experience"}
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
          Add Experience
        </button>
      )}

      {experiences.length === 0 && !isAddingNew && (
        <p className="text-center text-gray-500 py-8">
          No experiences added yet. Click "Add Experience" to get started.
        </p>
      )}
    </div>
  );
}
