'use client';

import * as React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup.Root
      className="inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
      type="single"
      value={theme}
      onValueChange={(value) => {
        if (value) setTheme(value);
      }}
      aria-label="Alternar tema"
    >
      <ToggleGroup.Item
        value="light"
        aria-label="Tema claro"
        className={cn(
          'inline-flex items-center justify-center rounded-md p-2 hover:bg-background hover:text-foreground',
          'data-[state=on]:bg-background data-[state=on]:text-foreground'
        )}
      >
        <Sun className="h-5 w-5" />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="dark"
        aria-label="Tema escuro"
        className={cn(
          'inline-flex items-center justify-center rounded-md p-2 hover:bg-background hover:text-foreground',
          'data-[state=on]:bg-background data-[state=on]:text-foreground'
        )}
      >
        <Moon className="h-5 w-5" />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="system"
        aria-label="Tema do sistema"
        className={cn(
          'inline-flex items-center justify-center rounded-md p-2 hover:bg-background hover:text-foreground',
          'data-[state=on]:bg-background data-[state=on]:text-foreground'
        )}
      >
        <Monitor className="h-5 w-5" />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
