'use client';

export const saveFormData = (data: any) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nutriplanner-data', JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error saving form data:', error);
  }
};

export const loadFormData = () => {
  try {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('nutriplanner-data');
      return data ? JSON.parse(data) : null;
    }
    return null;
  } catch (error) {
    console.error('Error loading form data:', error);
    return null;
  }
};