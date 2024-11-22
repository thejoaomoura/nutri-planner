'use client';

import { useForm } from '../useFormContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ClipboardList, ArrowRight } from 'lucide-react';
import FormLayout from './FormLayout';
import { useRouter } from 'next/navigation';

export function SummaryForm() {
  const { data, previousStep } = useForm();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/profile');
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Resumo das Informações</h2>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <Label className="text-muted-foreground">Dados Pessoais</Label>
              <p>Nome: {data.nome}</p>
              <p>Idade: {data.idade} anos</p>
              <p>Gênero: {data.genero}</p>
              <p>Peso: {data.peso}kg</p>
              <p>Altura: {data.altura}cm</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Nível de Atividade</Label>
              <p>{data.nivelAtividade}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Objetivo</Label>
              <p>{data.objetivo}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Estilo de Vida</Label>
              <p>Horário de acordar: {data.horaAcordar}</p>
              <p>Horário de dormir: {data.horaDormir}</p>
              {data.restricaoOrcamento && (
                <p>Orçamento mensal: R$ {data.orcamentoMensal}</p>
              )}
            </div>

            <div>
              <Label className="text-muted-foreground">Restrições Alimentares</Label>
              {data.restricoesAlimentares?.length > 0 ? (
                <p>{data.restricoesAlimentares.join(', ')}</p>
              ) : (
                <p>Nenhuma restrição alimentar</p>
              )}
            </div>

            <div>
              <Label className="text-muted-foreground">Alergias</Label>
              {data.alergias?.length > 0 ? (
                <p>{data.alergias.join(', ')}</p>
              ) : (
                <p>Nenhuma alergia</p>
              )}
            </div>

            <div>
              <Label className="text-muted-foreground">Preferências Alimentares</Label>
              {data.preferenciasAlimentares?.length > 0 ? (
                <p>{data.preferenciasAlimentares.join(', ')}</p>
              ) : (
                <p>Nenhuma preferência alimentar específica</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
          >
            Voltar
          </Button>
          <Button type="submit">
            Finalizar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
