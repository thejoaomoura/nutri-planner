'use client';

import { useState, useEffect } from 'react';
import { PartialUserData, FormStep } from '@/types/form';
import { loadFormData, saveFormData } from '@/lib/storage';
import { FormContext } from './useFormContext';

const STEPS: FormStep[] = ['personal', 'activity', 'goals', 'lifestyle', 'dietary'];

const initialData: PartialUserData = {
  restricoesAlimentares: [],
  alergias: [],
  preferenciasAlimentares: [],
};

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<PartialUserData>(initialData);
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');

  useEffect(() => {
    const savedData = loadFormData();
    if (savedData) {
      setData({ ...initialData, ...savedData });
    }
    setIsLoading(false);
  }, []);

  const updateData = (newData: Partial<PartialUserData>) => {
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