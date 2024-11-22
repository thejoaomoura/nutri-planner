'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

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
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // Handle phrase transitions with fade effect
    const phraseInterval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % loadingPhrases.length);
        setFadeIn(true);
      }, 200);
    }, 3000);

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 50);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <main className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="relative space-y-6">
          {/* Loading Icon */}
          <div className="flex justify-center mb-6">
            <Loader2 className="w-12 h-12 text-white/90 animate-spin" />
          </div>
          
          {/* Loading Message */}
          <div className="h-20 flex items-center justify-center">
            <h2 
              className={`text-2xl font-medium text-white/90 transition-opacity duration-200 ease-in-out ${
                fadeIn ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {loadingPhrases[currentPhrase]}
            </h2>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress 
              value={progress} 
              className="h-2 w-full bg-white/20" 
            />
            <p className="text-sm text-white/70 font-medium">
              {Math.round(progress)}%
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}