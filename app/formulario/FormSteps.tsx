'use client';

import { PersonalDataForm } from './steps/PersonalDataForm';
import { ActivityLevelForm } from './steps/ActivityLevelForm';
import { GoalsForm } from './steps/GoalsForm';
import { LifestyleForm } from './steps/LifestyleForm';
import { DietaryRestrictionsForm } from './steps/DietaryRestrictionsForm';
import { useForm } from './FormProvider';
import { Progress } from '@/components/ui/progress';

export function FormSteps() {
  const { currentStep } = useForm();

  const steps = {
    personal: {
      title: 'Dados Pessoais',
      component: PersonalDataForm,
    },
    activity: {
      title: 'Nível de Atividade',
      component: ActivityLevelForm,
    },
    goals: {
      title: 'Objetivos',
      component: GoalsForm,
    },
    lifestyle: {
      title: 'Estilo de Vida',
      component: LifestyleForm,
    },
    dietary: {
      title: 'Restrições Alimentares',
      component: DietaryRestrictionsForm,
    },
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((Object.keys(steps).indexOf(currentStep) + 1) / Object.keys(steps).length) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {steps[currentStep].title}
        </h2>
        <Progress value={progress} className="w-full" />
      </div>
      <CurrentStepComponent />
    </div>
  );
}