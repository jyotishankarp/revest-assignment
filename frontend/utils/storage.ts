import { FormValues } from "@/types/form";

const STORAGE_KEY = "signup_form_data";

export const saveFormData = (data: FormValues): void => {
  try {
    const existingData = getFormData();
    const allData = Array.isArray(existingData) ? existingData : [];
    allData.push({
      ...data,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
  } catch (error) {
    console.error("Error saving form data to localStorage:", error);
    throw new Error("Failed to save form data");
  }
};

export const getFormData = (): FormValues[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading form data from localStorage:", error);
    return [];
  }
};

export const clearFormData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing form data from localStorage:", error);
  }
};
