import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ToggleGroup.Root
      type="single"
      value={theme}
      onValueChange={(value) => {
        if (value) setTheme(value);
      }}
      aria-label="Modo de tema"
      className="Z6PRs inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1"
    >
      <ToggleGroup.Item
        value="light"
        aria-label="Modo claro"
        className="flex items-center justify-center w-8 h-8 rounded transition-all data-[state=on]:bg-white data-[state=on]:text-black dark:data-[state=on]:bg-gray-700 dark:data-[state=on]:text-white"
      >
        <Sun className="h-4 w-4" />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="dark"
        aria-label="Modo escuro"
        className="flex items-center justify-center w-8 h-8 rounded transition-all data-[state=on]:bg-white data-[state=on]:text-black dark:data-[state=on]:bg-gray-700 dark:data-[state=on]:text-white"
      >
        <Moon className="h-4 w-4" />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="system"
        aria-label="Modo do sistema"
        className="flex items-center justify-center w-8 h-8 rounded transition-all data-[state=on]:bg-white data-[state=on]:text-black dark:data-[state=on]:bg-gray-700 dark:data-[state=on]:text-white"
      >
        <Monitor className="h-4 w-4" />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};

export default ThemeToggle;
