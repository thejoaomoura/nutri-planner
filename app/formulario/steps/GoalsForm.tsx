'use client';

import { useForm as useFormContext } from '../FormProvider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target } from 'lucide-react';

export function GoalsForm() {
  const { data, updateData, nextStep, previousStep } = useFormContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="objetivo" className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          Objetivo
        </Label>
        <Select
          value={data.objetivo}
          onValueChange={(value: any) => updateData({ objetivo: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione seu objetivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="perderPeso">Perder peso</SelectItem>
            <SelectItem value="manterPeso">Manter peso</SelectItem>
            <SelectItem value="ganharPeso">Ganhar peso</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" className="w-full" onClick={previousStep}>
          Anterior
        </Button>
        <Button type="submit" className="w-full">
          Próximo
        </Button>
      </div>
    </form>
  );
}