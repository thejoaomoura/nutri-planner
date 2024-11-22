'use client';

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { User, RefreshCcw, Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

  if (!planoAlimentar) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Botão de voltar */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="hover:bg-gray-100 -ml-4">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar à Página Inicial
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Seu Plano Alimentar Personalizado
          </h1>
          <p className="text-muted-foreground text-lg">
            Desenvolvido especialmente para suas necessidades e objetivos
          </p>
        </div>
        
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              Informações Nutricionais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-purple max-w-none">
              <ReactMarkdown>
                {planoAlimentar.plan}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center gap-6 mt-12">
        <p className="text-muted-foreground text-center max-w-2xl">
            Este plano foi gerado por I.A com base nas suas preferências. Para valores mais precisos e individualizados, consulte um nutricionista.
          </p>
          <div className="flex gap-4">
            <Button 
              onClick={handleGerarNovamente}
              className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
            >
              <RefreshCcw className="mr-2 h-5 w-5" />
              Gerar Novo Plano
            </Button>
            <Button 
              onClick={() => window.print()}
              variant="outline"
              className="px-8 py-6 text-lg"
            >
              <Printer className="mr-2 h-5 w-5" />
              Imprimir Plano
            </Button>
            <Button
              onClick={() => router.push('/profile')}
              variant="secondary"
              className="px-8 py-6 text-lg"
            >
              <User className="mr-2 h-5 w-5" />
              Meu Perfil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
