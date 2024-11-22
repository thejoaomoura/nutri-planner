'use client';

import { createContext, useContext } from 'react';
import { PartialUserData, FormStep } from '@/types/form';

export interface FormContextType {
  data: PartialUserData;
  currentStep: FormStep;
  updateData: (newData: Partial<PartialUserData>) => void;
  nextStep: () => void;
  previousStep: () => void;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
