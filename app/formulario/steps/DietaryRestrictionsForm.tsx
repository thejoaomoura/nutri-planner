'use client';

import { useForm as useFormContext } from '../FormProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Ban, AlertTriangle, Heart } from 'lucide-react';

export function DietaryRestrictionsForm() {
  const router = useRouter();
  const { data, updateData, previousStep } = useFormContext();
  const [newRestriction, setNewRestriction] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newPreference, setNewPreference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Redirecionar para a tela de loading
      router.push('/loading');

      // Iniciar a geração do plano em segundo plano
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar o plano alimentar');
      }

      const result = await response.json();
      
      // Gerar um ID único para o plano
      const planId = Math.random().toString(36).substring(2);
      
      // Salvar o plano no localStorage
      localStorage.setItem(`plan_${planId}`, JSON.stringify(result));

      // Redirecionar para a página de resultados
      router.push(`/resultados?id=${planId}`);
    } catch (error) {
      console.error('Erro:', error);
      router.push('/formulario?error=true');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addRestriction = () => {
    if (newRestriction) {
      updateData({
        restricoesAlimentares: [...(data.restricoesAlimentares || []), newRestriction],
      });
      setNewRestriction('');
    }
  };

  const addAllergy = () => {
    if (newAllergy) {
      updateData({
        alergias: [...(data.alergias || []), newAllergy],
      });
      setNewAllergy('');
    }
  };

  const addPreference = () => {
    if (newPreference) {
      updateData({
        preferenciasAlimentares: [...(data.preferenciasAlimentares || []), newPreference],
      });
      setNewPreference('');
    }
  };

  const removeRestriction = (index: number) => {
    const newRestrictions = [...(data.restricoesAlimentares || [])];
    newRestrictions.splice(index, 1);
    updateData({ restricoesAlimentares: newRestrictions });
  };

  const removeAllergy = (index: number) => {
    const newAllergies = [...(data.alergias || [])];
    newAllergies.splice(index, 1);
    updateData({ alergias: newAllergies });
  };

  const removePreference = (index: number) => {
    const newPreferences = [...(data.preferenciasAlimentares || [])];
    newPreferences.splice(index, 1);
    updateData({ preferenciasAlimentares: newPreferences });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="restricoes" className="flex items-center gap-2">
          <Ban className="h-4 w-4" />
          Restrições Alimentares
        </Label>
        <div className="flex gap-2">
          <Input
            value={newRestriction}
            onChange={(e) => setNewRestriction(e.target.value)}
            placeholder="Ex: Vegetariano, Vegano"
          />
          <Button type="button" onClick={addRestriction}>
            Adicionar
          </Button>
        </div>
        <ul className="list-disc pl-5 space-y-2">
          {data.restricoesAlimentares?.map((restricao, index) => (
            <li key={index} className="flex items-center justify-between group">
              <span>{restricao}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeRestriction(index)}
                className="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alergias" className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Alergias Alimentares
        </Label>
        <div className="flex gap-2">
          <Input
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            placeholder="Ex: Amendoim, Lactose"
          />
          <Button type="button" onClick={addAllergy}>
            Adicionar
          </Button>
        </div>
        <ul className="list-disc pl-5 space-y-2">
          {data.alergias?.map((alergia, index) => (
            <li key={index} className="flex items-center justify-between group">
              <span>{alergia}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeAllergy(index)}
                className="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferencias" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Preferências Alimentares
        </Label>
        <div className="flex gap-2">
          <Input
            value={newPreference}
            onChange={(e) => setNewPreference(e.target.value)}
            placeholder="Ex: Frutos do mar, Saladas"
          />
          <Button type="button" onClick={addPreference}>
            Adicionar
          </Button>
        </div>
        <ul className="list-disc pl-5 space-y-2">
          {data.preferenciasAlimentares?.map((preferencia, index) => (
            <li key={index} className="flex items-center justify-between group">
              <span>{preferencia}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removePreference(index)}
                className="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" className="w-full" onClick={previousStep}>
          Anterior
        </Button>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Gerando plano...' : 'Finalizar'}
        </Button>
      </div>
    </form>
  );
}