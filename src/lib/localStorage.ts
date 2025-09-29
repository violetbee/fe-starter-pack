import { ResumeState } from "@/store/slices/resumeSlice";

export const RESUME_STORAGE_KEY = "boencv_resume";
export const RESUME_ID_KEY = "boencv_resume_id";

export const getResumeId = (): string => {
  if (typeof window === "undefined") {
    return `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  let resumeId = localStorage.getItem(RESUME_ID_KEY);

  if (!resumeId) {
    resumeId = `resume_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    localStorage.setItem(RESUME_ID_KEY, resumeId);
  }

  return resumeId;
};

export const saveResumeToLocalStorage = (resumeData: Partial<ResumeState>) => {
  try {
    if (typeof window === "undefined") {
      return false;
    }

    const resumeId = getResumeId();
    const existingData = getResumeFromLocalStorage();

    const dataToSave = {
      ...existingData,
      ...resumeData,
      lastUpdated: new Date().toISOString(),
      id: resumeId,
    };

    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(dataToSave));

    localStorage.setItem(
      `${RESUME_STORAGE_KEY}_${resumeId}`,
      JSON.stringify(dataToSave)
    );

    return true;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return false;
  }
};

export const getResumeFromLocalStorage = (): Partial<ResumeState> | null => {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const data = localStorage.getItem(RESUME_STORAGE_KEY);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);

    const { lastUpdated, id, ...resumeData } = parsedData;

    return resumeData;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

export const clearResumeFromLocalStorage = () => {
  try {
    if (typeof window === "undefined") {
      return false;
    }

    const resumeId = getResumeId();

    localStorage.removeItem(RESUME_STORAGE_KEY);
    localStorage.removeItem(RESUME_ID_KEY);
    localStorage.removeItem(`${RESUME_STORAGE_KEY}_${resumeId}`);

    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
};

export const getAllResumes = (): Array<{
  id: string;
  data: any;
  lastUpdated: string;
}> => {
  try {
    if (typeof window === "undefined") {
      return [];
    }

    const resumes: Array<{ id: string; data: any; lastUpdated: string }> = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && key.startsWith(`${RESUME_STORAGE_KEY}_resume_`)) {
        const data = localStorage.getItem(key);

        if (data) {
          const parsedData = JSON.parse(data);
          resumes.push({
            id: parsedData.id,
            data: parsedData,
            lastUpdated: parsedData.lastUpdated,
          });
        }
      }
    }

    return resumes.sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
  } catch (error) {
    console.error("Error getting all resumes:", error);
    return [];
  }
};

export const enableAutoSave = (
  getState: () => Partial<ResumeState>,
  interval: number = 30000
) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const intervalId = setInterval(() => {
    const state = getState();
    saveResumeToLocalStorage(state);
    console.log("Auto-saved resume data");
  }, interval);

  return () => clearInterval(intervalId);
};
