import { FormProvider } from './FormProvider';
import { FormSteps } from './FormSteps';

export default function FormularioPage() {
  return (
    <main className="min-h-screen page-bg py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8">
        <FormProvider>
          <FormSteps />
        </FormProvider>
      </div>
    </main>
  );
}
