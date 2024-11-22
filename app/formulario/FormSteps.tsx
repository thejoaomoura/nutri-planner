'use client';

import { PersonalDataForm } from './steps/PersonalDataForm';
import { ActivityLevelForm } from './steps/ActivityLevelForm';
import { GoalsForm } from './steps/GoalsForm';
import { LifestyleForm } from './steps/LifestyleForm';
import { DietaryRestrictionsForm } from './steps/DietaryRestrictionsForm';
import { SummaryForm } from './steps/SummaryForm';
import { useForm } from './useFormContext';
import { Progress } from '@/components/ui/progress';
import { FormStep } from '@/types/form';
import { FC } from 'react';

type FormComponent = FC<{}>;

const stepComponents: Record<FormStep, FormComponent> = {
  personal: PersonalDataForm,
  activity: ActivityLevelForm,
  goals: GoalsForm,
  lifestyle: LifestyleForm,
  dietary: DietaryRestrictionsForm,
  summary: SummaryForm,
};

type StepsConfig = {
  [K in FormStep]: {
    title: string;
    component: FormComponent;
  };
};

export function FormSteps() {
  const { currentStep } = useForm();

  const steps: StepsConfig = {
    personal: {
      title: 'Dados Pessoais',
      component: stepComponents.personal,
    },
    activity: {
      title: 'Nível de Atividade',
      component: stepComponents.activity,
    },
    goals: {
      title: 'Objetivos',
      component: stepComponents.goals,
    },
    lifestyle: {
      title: 'Estilo de Vida',
      component: stepComponents.lifestyle,
    },
    dietary: {
      title: 'Restrições Alimentares',
      component: stepComponents.dietary,
    },
    summary: {
      title: 'Resumo',
      component: stepComponents.summary,
    },
  };

  const StepComponent = steps[currentStep].component;

  const totalSteps = Object.keys(steps).length;
  const currentStepIndex = Object.keys(steps).indexOf(currentStep) + 1;
  const progress = (currentStepIndex / totalSteps) * 100;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground text-center">
          Passo {currentStepIndex} de {totalSteps}: {steps[currentStep].title}
        </p>
      </div>
      <StepComponent />
    </div>
  );
}