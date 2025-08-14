// utils.js
export const STORAGE_KEYS = {
    projects: "admin_projects",
    team: "admin_team",
  };
  
  export function readLS(key) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : [];
    } catch (e) {
      console.warn("Failed to read localStorage", e);
      return [];
    }
  }
  
  export function writeLS(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Failed to write localStorage", e);
    }
  }
  
  export function fileToDataUrl(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }
  
  export function classNames(...xs) {
    return xs.filter(Boolean).join(" ");
  }
  