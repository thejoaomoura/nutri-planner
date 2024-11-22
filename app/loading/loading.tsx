import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <main className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
      <div className="flex justify-center">
        <Loader2 className="w-12 h-12 text-white/90 animate-spin" />
      </div>
    </main>
  );
}
