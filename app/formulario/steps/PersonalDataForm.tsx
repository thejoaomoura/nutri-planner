'use client';

import { useForm } from '../FormProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, CalendarDays, Users, Scale, Ruler } from 'lucide-react';
import FormLayout from './FormLayout';

export function PersonalDataForm() {
  const { data, updateData, nextStep } = useForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label 
            htmlFor="nome" 
            className="flex items-center gap-2 text-base font-medium text-foreground/90"
          >
            <User className="h-4 w-4 text-primary/70" />
            Nome
          </Label>
          <Input
            id="nome"
            value={data.nome || ''}
            onChange={(e) => updateData({ nome: e.target.value })}
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div className="space-y-3">
          <Label 
            htmlFor="idade" 
            className="flex items-center gap-2 text-base font-medium text-foreground/90"
          >
            <CalendarDays className="h-4 w-4 text-primary/70" />
            Idade
          </Label>
          <Input
            id="idade"
            type="number"
            placeholder="Digite sua idade"
            value={data.idade || ''}
            onChange={(e) => updateData({ idade: Number(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-3">
          <Label 
            htmlFor="genero" 
            className="flex items-center gap-2 text-base font-medium text-foreground/90"
          >
            <Users className="h-4 w-4 text-primary/70" />
            Gênero
          </Label>
          <Select
            value={data.genero}
            onValueChange={(value: 'masculino' | 'feminino') => updateData({ genero: value })}
          >
            <SelectTrigger id="genero">
              <SelectValue placeholder="Selecione seu gênero" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculino">👨‍♂️ Masculino</SelectItem>
              <SelectItem value="feminino">👩‍♀️ Feminino</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label 
            htmlFor="peso" 
            className="flex items-center gap-2 text-base font-medium text-foreground/90"
          >
            <Scale className="h-4 w-4 text-primary/70" />
            Peso (kg)
          </Label>
          <Input
            id="peso"
            type="number"
            step="0.1"
            placeholder="Digite seu peso em kg"
            value={data.peso || ''}
            onChange={(e) => updateData({ peso: Number(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-3">
          <Label 
            htmlFor="altura" 
            className="flex items-center gap-2 text-base font-medium text-foreground/90"
          >
            <Ruler className="h-4 w-4 text-primary/70" />
            Altura (cm)
          </Label>
          <Input
            id="altura"
            type="number"
            placeholder="Digite sua altura em cm"
            value={data.altura || ''}
            onChange={(e) => updateData({ altura: Number(e.target.value) })}
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full mt-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Próximo
        </Button>
      </form>
    </FormLayout>
  );
}