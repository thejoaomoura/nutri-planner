'use client';

import { PersonalDataForm } from './steps/PersonalDataForm';
import { ActivityLevelForm } from './steps/ActivityLevelForm';
import { GoalsForm } from './steps/GoalsForm';
import { LifestyleForm } from './steps/LifestyleForm';
import { DietaryRestrictionsForm } from './steps/DietaryRestrictionsForm';
import { useForm } from './FormProvider';
import { Progress } from '@/components/ui/progress';

const stepComponents = {
  personal: PersonalDataForm,
  activity: ActivityLevelForm,
  goals: GoalsForm,
  lifestyle: LifestyleForm,
  dietary: DietaryRestrictionsForm,
};

export function FormSteps() {
  const { currentStep } = useForm();

  const steps = {
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
  };

  const currentStepComponent = steps[currentStep as keyof typeof steps].component;
  const CurrentComponent = currentStepComponent;

  const totalSteps = Object.keys(steps).length;
  const currentStepIndex = Object.keys(steps).indexOf(currentStep) + 1;
  const progress = (currentStepIndex / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 p-4">
      <div className="space-y-2">
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground text-center">
          Passo {currentStepIndex} de {totalSteps}
        </p>
      </div>
      <CurrentComponent />
    </div>
  );
}