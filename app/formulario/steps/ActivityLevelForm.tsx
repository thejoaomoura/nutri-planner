'use client';

import { useForm as useFormContext } from '../FormProvider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dumbbell } from 'lucide-react';

export function ActivityLevelForm() {
  const { data, updateData, nextStep, previousStep } = useFormContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nivelAtividade" className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4" />
          Nível de Atividade Física
        </Label>
        <Select
          value={data.nivelAtividade}
          onValueChange={(value: any) => updateData({ nivelAtividade: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione seu nível de atividade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentario">Sedentário (pouco ou nenhum exercício)</SelectItem>
            <SelectItem value="leveAtivo">Levemente ativo (exercício leve 1-3 dias/semana)</SelectItem>
            <SelectItem value="moderadamenteAtivo">Moderadamente ativo (exercício moderado 3-5 dias/semana)</SelectItem>
            <SelectItem value="muitoAtivo">Muito ativo (exercício pesado 6-7 dias/semana)</SelectItem>
            <SelectItem value="extremamenteAtivo">Extremamente ativo (exercício muito pesado, trabalho físico)</SelectItem>
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