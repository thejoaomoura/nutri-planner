'use client';

import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { RefreshCcw, Printer, ArrowLeft, FileDown, Leaf, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/toggle-group';
import jsPDF from 'jspdf';
import { loadFormData } from '@/lib/storage';
import { PartialUserData } from '@/types/form';

const OBJETIVO_LABEL: Record<string, string> = {
  perderPeso: 'Perder peso',
  manterPeso: 'Manter peso',
  ganharPeso: 'Ganhar massa',
};

const ATIVIDADE_LABEL: Record<string, string> = {
  sedentario: 'Sedentário',
  leveAtivo: 'Levemente ativo',
  moderadamenteAtivo: 'Moderadamente ativo',
  muitoAtivo: 'Muito ativo',
  extremamenteAtivo: 'Extremamente ativo',
};

function calcTDEE(userData: PartialUserData): number | null {
  const { genero, peso, altura, idade, nivelAtividade } = userData;
  if (!genero || !peso || !altura || !idade || !nivelAtividade) return null;
  const tmb = genero === 'masculino'
    ? 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * idade
    : 447.593 + 9.247 * peso + 3.098 * altura - 4.330 * idade;
  const fator: Record<string, number> = {
    sedentario: 1.2, leveAtivo: 1.375, moderadamenteAtivo: 1.55,
    muitoAtivo: 1.725, extremamenteAtivo: 1.9,
  };
  return Math.round(tmb * (fator[nivelAtividade] ?? 1.2));
}

export default function ResultadosPage() {
  const router = useRouter();
  const [planoAlimentar, setPlanoAlimentar] = useState<any>(null);
  const [userData, setUserData] = useState<PartialUserData | null>(null);
  const searchParams = useSearchParams();
  const planId = searchParams.get('id');

  useEffect(() => {
    const profile = loadFormData();
    if (profile) setUserData(profile);

    if (!planId) return;
    try {
      const stored = localStorage.getItem(`plan_${planId}`);
      if (stored) {
        setPlanoAlimentar(JSON.parse(stored));
        localStorage.setItem('lastPlanId', planId);
      }
    } catch (e) {
      console.error('Erro ao carregar plano:', e);
    }
  }, [planId]);

  const handleGerarNovamente = () => {
    if (planId) localStorage.removeItem(`plan_${planId}`);
    router.push('/formulario');
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const margin = 20;
    const cw = pw - 2 * margin;
    let y = margin;

    // Header stripe
    doc.setFillColor(22, 101, 52);
    doc.rect(0, 0, pw, 38, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Plano Alimentar Personalizado', margin, 18);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('NutriPlanner · Gerado por IA', margin, 28);
    const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    doc.text(today, pw - margin, 28, { align: 'right' });
    y = 50;

    // User chip
    if (userData?.nome) {
      doc.setTextColor(22, 101, 52);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(`Paciente: ${userData.nome}`, margin, y);
      y += 8;
      if (userData.objetivo) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        const tdee = calcTDEE(userData);
        const chips = [
          OBJETIVO_LABEL[userData.objetivo] ?? userData.objetivo,
          ATIVIDADE_LABEL[userData.nivelAtividade ?? ''] ?? '',
          tdee ? `${tdee} kcal/dia estimado` : '',
        ].filter(Boolean).join('  ·  ');
        doc.text(chips, margin, y);
        y += 10;
      }
    }

    // Divider
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pw - margin, y);
    y += 8;

    // Content
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);

    const clean = planoAlimentar.plan
      .replace(/\*\*/g, '').replace(/\*/g, '')
      .replace(/#{1,6}\s/g, '').replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/^\s*[-*+]\s/gm, '• ');

    const lines = doc.splitTextToSize(clean, cw);
    lines.forEach((line: string) => {
      if (y > ph - 25) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 6;
    });

    // Footer
    const pc = doc.internal.pages.length - 1;
    for (let i = 1; i <= pc; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('Consulte um nutricionista para orientações personalizadas.', margin, ph - 10);
      doc.text(`${i} / ${pc}`, pw - margin, ph - 10, { align: 'right' });
    }

    doc.save('plano-alimentar-nutriplanner.pdf');
  };

  if (!planoAlimentar) {
    return (
      <div className="flex items-center justify-center min-h-screen page-bg">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const tdee = userData ? calcTDEE(userData) : null;
  const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen page-bg print:bg-white">

      {/* Sticky top bar */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between gap-3 py-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5 -ml-2">
              <ArrowLeft className="h-4 w-4" />
              Início
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-1.5 hidden sm:flex">
              <Printer className="h-3.5 w-3.5" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" onClick={handleSavePDF} className="gap-1.5">
              <FileDown className="h-3.5 w-3.5" />
              PDF
            </Button>
            <Button size="sm" onClick={handleGerarNovamente} className="gap-1.5">
              <RefreshCcw className="h-3.5 w-3.5" />
              Novo plano
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 print:py-4">

        {/* Hero card */}
        <div className="rounded-2xl bg-primary text-primary-foreground px-6 py-7 mb-6 print:rounded-none print:mb-4">
          <div className="flex items-center gap-2 mb-4 opacity-80">
            <Leaf className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">NutriPlanner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 leading-tight">
            Plano Alimentar Personalizado
          </h1>
          {userData?.nome && (
            <p className="opacity-80 text-sm mb-5">Para {userData.nome}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            {userData?.objetivo && (
              <span className="inline-flex items-center gap-1.5 bg-primary-foreground/15 border border-primary-foreground/20 rounded-full px-3 py-1 text-xs font-medium">
                {OBJETIVO_LABEL[userData.objetivo] ?? userData.objetivo}
              </span>
            )}
            {userData?.nivelAtividade && (
              <span className="inline-flex items-center gap-1.5 bg-primary-foreground/15 border border-primary-foreground/20 rounded-full px-3 py-1 text-xs font-medium">
                {ATIVIDADE_LABEL[userData.nivelAtividade] ?? userData.nivelAtividade}
              </span>
            )}
            {tdee && (
              <span className="inline-flex items-center gap-1.5 bg-primary-foreground/15 border border-primary-foreground/20 rounded-full px-3 py-1 text-xs font-medium">
                ~{tdee.toLocaleString()} kcal/dia
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 bg-primary-foreground/15 border border-primary-foreground/20 rounded-full px-3 py-1 text-xs font-medium">
              <Calendar className="h-3 w-3" />
              {today}
            </span>
          </div>
        </div>

        {/* Plan content */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-5 print:border-0 print:rounded-none">
          <div className="border-b border-border px-6 py-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Informações Nutricionais</span>
          </div>
          <div className="px-6 py-6">
            <div className="
              prose prose-sm max-w-none dark:prose-invert
              prose-headings:font-semibold prose-headings:text-foreground
              prose-h1:text-xl prose-h2:text-lg prose-h2:border-b prose-h2:border-border prose-h2:pb-2
              prose-h3:text-base prose-h3:text-primary
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-li:text-muted-foreground
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:space-y-1 prose-ol:space-y-1
              prose-table:border prose-table:border-border
              prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-xs prose-th:uppercase prose-th:tracking-wide
              prose-td:px-3 prose-td:py-2 prose-td:border-b prose-td:border-border prose-td:text-sm
            ">
              <ReactMarkdown>{planoAlimentar.plan}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-xl px-4 py-3 mb-8 print:mb-4">
          <span className="text-muted-foreground text-xs leading-relaxed">
            ⚕️ Este plano foi gerado por inteligência artificial com base nas informações fornecidas.
            Consulte um nutricionista para orientações personalizadas e clinicamente validadas.
          </span>
        </div>

        {/* Action buttons — visible only on screen */}
        <div className="flex flex-wrap gap-3 justify-center print:hidden">
          <Button onClick={handleGerarNovamente} className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Gerar Novo Plano
          </Button>
          <Button onClick={handleSavePDF} variant="outline" className="gap-2">
            <FileDown className="h-4 w-4" />
            Salvar PDF
          </Button>
          <Button onClick={() => window.print()} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button onClick={() => router.push('/profile')} variant="secondary" className="gap-2">
            <User className="h-4 w-4" />
            Meu Perfil
          </Button>
        </div>
      </main>
    </div>
  );
}
