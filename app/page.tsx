'use client';

import { ArrowRight, Calculator, Leaf, Target, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Calculator,
    title: 'Cálculo de Calorias',
    desc: 'Baseado no seu metabolismo basal e nível de atividade',
  },
  {
    icon: Target,
    title: 'Objetivos Claros',
    desc: 'Emagrecer, manter ou ganhar peso com estratégias reais',
  },
  {
    icon: Leaf,
    title: 'Respeita Restrições',
    desc: 'Alergias e preferências alimentares consideradas no cardápio',
  },
  {
    icon: Clock,
    title: 'Rotina Adaptada',
    desc: 'Horários de refeições ajustados ao seu dia a dia',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen page-bg flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">NutriPlanner</span>
          </div>
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5">
              <User className="h-4 w-4" />
              Perfil
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-primary/8 text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/15 mb-8">
              <Leaf className="h-3 w-3" />
              Plano alimentar com IA
            </span>

            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-5 tracking-tight leading-[1.1]">
              Nutrição feita{' '}
              <br className="hidden sm:block" />
              para{' '}
              <span className="text-primary">você</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
              Responda algumas perguntas e receba um plano alimentar personalizado considerando seus objetivos, restrições e rotina.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href="/formulario">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-7 h-11 text-sm font-medium shadow-sm gap-2"
                >
                  Criar meu plano
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-7 h-11 text-sm border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Ver meu perfil
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-border bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                className="bg-card rounded-xl p-5 border border-border"
              >
                <div className="w-9 h-9 bg-primary/8 rounded-lg flex items-center justify-center mb-3 border border-primary/10">
                  <feature.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground text-sm mb-1.5">{feature.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 text-center border-t border-border bg-background">
        <p className="text-xs text-muted-foreground">
          Desenvolvido por{' '}
          <a
            href="https://api.whatsapp.com/send/?phone=5516996109582"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-primary font-medium transition-colors"
          >
            João Moura
          </a>
          {' '}· +1.000 planos gerados
        </p>
      </footer>
    </main>
  );
}
