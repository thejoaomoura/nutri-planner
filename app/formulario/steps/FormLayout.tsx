'use client';

import { ReactNode } from 'react';
import ThemeToggle from '@/components/ui/toggle-group';

interface FormLayoutProps {
  children: ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <div>
      <div className="flex justify-end mb-5">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
