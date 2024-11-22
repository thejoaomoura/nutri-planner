'use client';

import { useForm as useFormContext } from '../FormProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sun, Moon, Wallet } from 'lucide-react';

export function LifestyleForm() {
  const { data, updateData, nextStep, previousStep } = useFormContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="horaAcordar" className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          Horário que costuma acordar
        </Label>
        <Input
          id="horaAcordar"
          type="time"
          value={data.horaAcordar || ''}
          onChange={(e) => updateData({ horaAcordar: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="horaDormir" className="flex items-center gap-2">
          <Moon className="h-4 w-4" />
          Horário que costuma dormir
        </Label>
        <Input
          id="horaDormir"
          type="time"
          value={data.horaDormir || ''}
          onChange={(e) => updateData({ horaDormir: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Restrição de orçamento
        </Label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="restricaoOrcamento"
            checked={data.restricaoOrcamento || false}
            onChange={(e) => updateData({ restricaoOrcamento: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="restricaoOrcamento">Tenho restrição de orçamento</Label>
        </div>
      </div>

      {data.restricaoOrcamento && (
        <div className="space-y-2">
          <Label htmlFor="orcamentoMensal">Orçamento mensal para alimentação (R$)</Label>
          <Input
            id="orcamentoMensal"
            type="number"
            value={data.orcamentoMensal || ''}
            onChange={(e) => updateData({ orcamentoMensal: Number(e.target.value) })}
            required
          />
        </div>
      )}

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