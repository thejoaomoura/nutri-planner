'use client';

import { UserData, PartialUserData } from '@/types/form';

const isClient = typeof window !== 'undefined';

export const saveFormData = (data: PartialUserData) => {
  try {
    if (isClient) {
      localStorage.setItem('nutriplanner-data', JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error saving form data:', error);
  }
};

export const loadFormData = (): PartialUserData | null => {
  try {
    if (isClient) {
      const data = localStorage.getItem('nutriplanner-data');
      return data ? JSON.parse(data) : null;
    }
    return null;
  } catch (error) {
    console.error('Error loading form data:', error);
    return null;
  }
};