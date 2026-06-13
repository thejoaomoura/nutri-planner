'use client';

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { User, RefreshCcw, Printer, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/toggle-group';
import jsPDF from 'jspdf';

export default function ResultadosPage() {
  const router = useRouter();
  const [planoAlimentar, setPlanoAlimentar] = useState<any>(null);
  const searchParams = useSearchParams();
  const planId = searchParams.get('id');

  useEffect(() => {
    const fetchPlano = async () => {
      try {
        if (!planId) return;
        
        const storedPlan = localStorage.getItem(`plan_${planId}`);
        if (storedPlan) {
          const parsedPlan = JSON.parse(storedPlan);
          setPlanoAlimentar(parsedPlan);
          // Armazenar o ID do último plano gerado
          localStorage.setItem('lastPlanId', planId);
          return;
        }
      } catch (error) {
        console.error('Erro ao carregar o plano:', error);
      }
    };

    if (planId) {
      fetchPlano();
    }
  }, [planId]);

  const handleGerarNovamente = () => {
    if (planId) {
      localStorage.removeItem(`plan_${planId}`);
    }
    router.push('/formulario');
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let currentY = margin;

    // Título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    const titleText = "Seu Plano Alimentar Personalizado";
    const titleWidth = doc.getTextWidth(titleText);
    const titleX = (pageWidth - titleWidth) / 2;
    doc.text(titleText, titleX, currentY);
    currentY += 15;

    // Preparar o texto removendo marcações Markdown
    let cleanText = planoAlimentar.plan
      .replace(/\*\*/g, '') // Remove **bold**
      .replace(/\*/g, '')   // Remove *italic*
      .replace(/#{1,6}\s/g, '') // Remove headers (#, ##, etc)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links [text](url)
      .replace(/`([^`]+)`/g, '$1') // Remove code blocks
      .replace(/^\s*[-*+]\s/gm, '• '); // Converte listas em bullets

    // Configurar fonte para o conteúdo
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const textLines = doc.splitTextToSize(cleanText, contentWidth);

    // Adicionar linhas ao PDF, criando novas páginas quando necessário
    textLines.forEach((line: string) => {
      if (currentY > pageHeight - 30) { 
        doc.addPage();
        currentY = margin;
      }
      doc.text(line, margin, currentY);
      currentY += 7; // Espaçamento entre linhas
    });

    // Adicionar rodapé em todas as páginas
    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(
        "Gerado por Nutri Planner - Consulte um nutricionista para valores mais precisos",
        margin,
        pageHeight - 10
      );
      // Adicionar número da página
      doc.text(
        `Página ${i} de ${pageCount}`,
        pageWidth - margin - 20,
        pageHeight - 10
      );
    }
    
    // Salvar o PDF
    doc.save("plano-alimentar.pdf");
  };

  if (!planoAlimentar) {
    return (
      <div className="flex items-center justify-center min-h-screen page-bg">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      <div className="container mx-auto py-8 px-4 sm:px-6 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5 -ml-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <ThemeToggle />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Seu Plano Alimentar
          </h1>
          <p className="text-muted-foreground">
            Desenvolvido com base nas suas informações e objetivos
          </p>
        </div>

        <Card className="mb-6 border border-border">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-base font-semibold text-foreground">
              Informações Nutricionais
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>
                {planoAlimentar.plan}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        <div className="border border-border rounded-xl p-4 bg-muted/40 mb-6">
          <p className="text-muted-foreground text-sm text-center">
            Este plano foi gerado por IA com base nas suas preferências. Para valores mais precisos, consulte um nutricionista.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={handleGerarNovamente} className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Gerar Novo Plano
            </Button>
            <Button onClick={() => window.print()} variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button onClick={handleSavePDF} variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              Salvar PDF
            </Button>
            <Button onClick={() => router.push('/profile')} variant="secondary" className="gap-2">
              <User className="h-4 w-4" />
              Meu Perfil
            </Button>
        </div>
      </div>
    </div>
  );
}
