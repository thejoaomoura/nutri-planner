'use client';

import { useForm as useFormContext } from '../FormProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, CalendarDays, Users, Scale, Ruler } from 'lucide-react';

export function PersonalDataForm() {
  const { data, updateData, nextStep } = useFormContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Nome
        </Label>
        <Input
          id="nome"
          value={data.nome || ''}
          onChange={(e) => updateData({ nome: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="idade" className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          Idade
        </Label>
        <Input
          id="idade"
          type="number"
          value={data.idade || ''}
          onChange={(e) => updateData({ idade: Number(e.target.value) })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="genero" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Gênero
        </Label>
        <Select
          value={data.genero}
          onValueChange={(value: 'masculino' | 'feminino') => updateData({ genero: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione seu gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masculino">👨‍♂️ Masculino</SelectItem>
            <SelectItem value="feminino">👩‍♀️ Feminino</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="peso" className="flex items-center gap-2">
          <Scale className="h-4 w-4" />
          Peso (kg)
        </Label>
        <Input
          id="peso"
          type="number"
          step="0.1"
          value={data.peso || ''}
          onChange={(e) => updateData({ peso: Number(e.target.value) })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="altura" className="flex items-center gap-2">
          <Ruler className="h-4 w-4" />
          Altura (cm)
        </Label>
        <Input
          id="altura"
          type="number"
          value={data.altura || ''}
          onChange={(e) => updateData({ altura: Number(e.target.value) })}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Próximo
      </Button>
    </form>
  );
}