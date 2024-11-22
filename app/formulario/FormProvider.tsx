'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { UserData, FormStep } from '@/types/form';
import { loadFormData, saveFormData } from '@/lib/storage';

interface FormContextType {
  data: Partial<UserData>;
  currentStep: FormStep;
  updateData: (newData: Partial<UserData>) => void;
  nextStep: () => void;
  previousStep: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const STEPS: FormStep[] = ['personal', 'activity', 'goals', 'lifestyle', 'dietary'];

const initialData: Partial<UserData> = {
  restricoesAlimentares: [],
  alergias: [],
  preferenciasAlimentares: [],
};

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Partial<UserData>>(initialData);
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');

  useEffect(() => {
    const savedData = loadFormData();
    if (savedData) {
      setData({ ...initialData, ...savedData });
    }
    setIsLoading(false);
  }, []);

  const updateData = (newData: Partial<UserData>) => {
    const updatedData = { ...data, ...newData };
    setData(updatedData);
    saveFormData(updatedData);
  };

  const nextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const previousStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <FormContext.Provider value={{ data, currentStep, updateData, nextStep, previousStep }}>
      {children}
    </FormContext.Provider>
  );
}

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};