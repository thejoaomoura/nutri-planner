'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

const loadingPhrases = [
  "Analisando seus dados...",
  "Calculando suas necessidades nutricionais...",
  "Desenvolvendo seu plano alimentar personalizado...",
  "Selecionando as melhores opções de refeições...",
  "Ajustando as recomendações ao seu estilo de vida...",
  "Finalizando seu plano nutricional...",
];

export default function LoadingPage() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % loadingPhrases.length);
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <main className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            {loadingPhrases[currentPhrase]}
          </h2>
          <Progress value={progress} className="w-full" />
        </div>
      </div>
    </main>
  );
}