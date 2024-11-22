import { FormProvider } from './FormProvider';
import { FormSteps } from './FormSteps';

export default function FormularioPage() {
  return (
    <main className="min-h-screen gradient-bg p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <FormProvider>
          <FormSteps />
        </FormProvider>
      </div>
    </main>
  );
}