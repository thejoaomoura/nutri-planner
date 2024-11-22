'use client';

import { ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 flex flex-col items-center justify-center p-4 sm:p-8 animate-gradient-x">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center text-white"
      >
        <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight">
          NutriPlanner
        </h1>
        <p className="text-xl sm:text-2xl mb-8 opacity-90 leading-relaxed">
          Transforme sua saúde com um plano alimentar personalizado baseado em ciência
        </p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-8 mb-12"
        >
          <p className="text-lg leading-relaxed">
            O NutriPlanner utiliza tecnologia avançada para criar um plano alimentar
            único, considerando seus objetivos, preferências e necessidades específicas.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-xl">
            <motion.li 
              className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-green-400 text-xl">✓</span>
              Cálculo preciso de calorias diárias
            </motion.li>
            <motion.li 
              className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-green-400 text-xl">✓</span>
              Planos alimentares personalizados
            </motion.li>
            <motion.li 
              className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-green-400 text-xl">✓</span>
              Recomendações baseadas em seus objetivos
            </motion.li>
            <motion.li 
              className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-green-400 text-xl">✓</span>
              Adaptado ao seu estilo de vida
            </motion.li>
          </ul>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/formulario">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
              Clique aqui para iniciar sua jornada
              <ArrowRight className="ml-2 animate-bounce-x" />
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white/20">
              <User className="mr-2 h-5 w-5" />
              Acessar Perfil
            </Button>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-sm text-white/80"
        >
          +1.000 pessoas já transformaram sua saúde com o NutriPlanner! 🎉
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-sm text-white/60 flex items-center justify-center gap-2"
        >
          Desenvolvido com <span className="text-red-500">❤</span> por{" "}
          <a 
            href="https://api.whatsapp.com/send/?phone=5516996109582" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rainbow-text font-semibold hover:scale-110 transition-transform"
          >
            João Moura
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}