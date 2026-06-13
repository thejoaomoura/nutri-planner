'use client';

import { useForm } from '../useFormContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ClipboardList, Loader2 } from 'lucide-react';
import FormLayout from './FormLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SummaryForm() {
  const { data, previousStep } = useForm();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      router.push('/loading');

      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result?.plan) {
        throw new Error(result.error || 'Resposta inválida do servidor');
      }

      const planId = Math.random().toString(36).substring(2);
      localStorage.setItem(`plan_${planId}`, JSON.stringify(result));
      router.push(`/resultados?id=${planId}`);
    } catch (err) {
      console.error('Erro ao gerar plano:', err);
      setError('Não foi possível gerar o plano. Verifique sua conexão e tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Resumo das Informações</h2>
          </div>

          <div className="space-y-4 text-sm divide-y divide-border">
            <div className="pt-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Dados Pessoais</Label>
              <div className="mt-1.5 space-y-0.5 text-foreground">
                <p>{data.nome}</p>
                <p>{data.idade} anos · {data.genero} · {data.peso}kg · {data.altura}cm</p>
              </div>
            </div>

            <div className="pt-3">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Atividade & Objetivo</Label>
              <div className="mt-1.5 space-y-0.5 text-foreground">
                <p>{data.nivelAtividade}</p>
                <p>{data.objetivo}</p>
              </div>
            </div>

            <div className="pt-3">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Rotina</Label>
              <div className="mt-1.5 space-y-0.5 text-foreground">
                <p>Acorda às {data.horaAcordar} · Dorme às {data.horaDormir}</p>
                {data.restricaoOrcamento && <p>Orçamento: R$ {data.orcamentoMensal}/mês</p>}
              </div>
            </div>

            <div className="pt-3">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Alimentação</Label>
              <div className="mt-1.5 space-y-0.5 text-foreground">
                <p>Restrições: {(data.restricoesAlimentares?.length ?? 0) > 0 ? data.restricoesAlimentares!.join(', ') : 'Nenhuma'}</p>
                <p>Alergias: {(data.alergias?.length ?? 0) > 0 ? data.alergias!.join(', ') : 'Nenhuma'}</p>
                <p>Preferências: {(data.preferenciasAlimentares?.length ?? 0) > 0 ? data.preferenciasAlimentares!.join(', ') : 'Nenhuma'}</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
        )}

        <div className="flex justify-between gap-3">
          <Button type="button" variant="outline" onClick={previousStep} disabled={isSubmitting}>
            Voltar
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando plano...</>
            ) : (
              'Gerar meu plano'
            )}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
