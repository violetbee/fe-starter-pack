import {
  getResumeFromLocalStorage,
  saveResumeToLocalStorage,
  RESUME_STORAGE_KEY,
  RESUME_ID_KEY,
} from "@/lib/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photo?: string; // Base64 or URL
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  category?: string; // Technical, Soft skills, Languages, etc.
}

export interface Language {
  id: string;
  name: string;
  proficiency: "native" | "fluent" | "professional" | "intermediate" | "basic";
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies?: string[];
  url?: string;
  githubUrl?: string;
}

export type ResumeTemplate = "modern" | "classic" | "professional" | "creative";

export interface ResumeState {
  currentStep: number;
  template: ResumeTemplate | null;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certificates: Certificate[];
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

const loadInitialState = (): ResumeState => {
  const savedData = getResumeFromLocalStorage();

  const defaultState: ResumeState = {
    currentStep: 0,
    template: null,
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      photo: "",
    },
    summary: "",
    experiences: [],
    education: [],
    skills: [],
    languages: [],
    certificates: [],
    projects: [],
    isLoading: false,
    error: null,
  };

  if (savedData) {
    return {
      ...defaultState,
      ...savedData,
      isLoading: false,
      error: null,
    } as ResumeState;
  }

  return defaultState;
};

const initialState: ResumeState = loadInitialState();

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep = Math.max(0, state.currentStep - 1);
    },
    setTemplate: (state, action: PayloadAction<ResumeTemplate>) => {
      state.template = action.payload;
    },
    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<PersonalInfo>>
    ) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
    },
    // Experience
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experiences.push(action.payload);
    },
    updateExperience: (state, action: PayloadAction<Experience>) => {
      const index = state.experiences.findIndex(
        (exp) => exp.id === action.payload.id
      );
      if (index !== -1) {
        state.experiences[index] = action.payload;
      }
    },
    removeExperience: (state, action: PayloadAction<string>) => {
      state.experiences = state.experiences.filter(
        (exp) => exp.id !== action.payload
      );
    },
    // Education
    addEducation: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action: PayloadAction<Education>) => {
      const index = state.education.findIndex(
        (edu) => edu.id === action.payload.id
      );
      if (index !== -1) {
        state.education[index] = action.payload;
      }
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter(
        (edu) => edu.id !== action.payload
      );
    },
    // Skills
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action: PayloadAction<Skill>) => {
      const index = state.skills.findIndex(
        (skill) => skill.id === action.payload.id
      );
      if (index !== -1) {
        state.skills[index] = action.payload;
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(
        (skill) => skill.id !== action.payload
      );
    },
    setSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload;
    },
    // Languages
    addLanguage: (state, action: PayloadAction<Language>) => {
      state.languages.push(action.payload);
    },
    updateLanguage: (state, action: PayloadAction<Language>) => {
      const index = state.languages.findIndex(
        (lang) => lang.id === action.payload.id
      );
      if (index !== -1) {
        state.languages[index] = action.payload;
      }
    },
    removeLanguage: (state, action: PayloadAction<string>) => {
      state.languages = state.languages.filter(
        (lang) => lang.id !== action.payload
      );
    },
    // Certificates
    addCertificate: (state, action: PayloadAction<Certificate>) => {
      state.certificates.push(action.payload);
    },
    updateCertificate: (state, action: PayloadAction<Certificate>) => {
      const index = state.certificates.findIndex(
        (cert) => cert.id === action.payload.id
      );
      if (index !== -1) {
        state.certificates[index] = action.payload;
      }
    },
    removeCertificate: (state, action: PayloadAction<string>) => {
      state.certificates = state.certificates.filter(
        (cert) => cert.id !== action.payload
      );
    },
    // Projects
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        (proj) => proj.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (proj) => proj.id !== action.payload
      );
    },
    resetResume: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(RESUME_STORAGE_KEY);
        localStorage.removeItem(RESUME_ID_KEY);
      }
      return loadInitialState();
    },
    loadFromLocalStorage: (state) => {
      const savedData = getResumeFromLocalStorage();
      if (savedData) {
        return { ...state, ...savedData, isLoading: false, error: null };
      }
      return state;
    },
    saveToLocalStorage: (state) => {
      saveResumeToLocalStorage(state);
      return state;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentStep,
  nextStep,
  prevStep,
  setTemplate,
  updatePersonalInfo,
  updateSummary,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  setSkills,
  addLanguage,
  updateLanguage,
  removeLanguage,
  addCertificate,
  updateCertificate,
  removeCertificate,
  addProject,
  updateProject,
  removeProject,
  resetResume,
  loadFromLocalStorage,
  saveToLocalStorage,
  setLoading,
  setError,
} = resumeSlice.actions;

export default resumeSlice.reducer;
