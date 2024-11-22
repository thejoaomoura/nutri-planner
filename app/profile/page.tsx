'use client';

import { useEffect, useState } from 'react';
import { UserData, PartialUserData } from '@/types/form';
import { loadFormData, saveFormData } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Activity,
  Target,
  Clock,
  Wallet,
  Apple,
  AlertTriangle,
  Heart,
  Save,
  Trash2,
  ArrowLeft,
  Utensils,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ThemeToggle from '@/components/ui/toggle-group';

export default function ProfilePage() {
  const [userData, setUserData] = useState<PartialUserData | null>(null);
  const [lastPlanId, setLastPlanId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const data = loadFormData();
    if (data) {
      setUserData({
        ...data,
        restricoesAlimentares: data.restricoesAlimentares || [],
        alergias: data.alergias || [],
        preferenciasAlimentares: data.preferenciasAlimentares || []
      });
    }
    // Carregar o último ID do plano do localStorage
    const storedPlanId = localStorage.getItem('lastPlanId');
    setLastPlanId(storedPlanId);
  }, []);

  const handleSave = () => {
    if (userData) {
      saveFormData(userData);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso!",
      });
    }
  };

  const handleDelete = () => {
    localStorage.removeItem('formData');
    setUserData(null);
    toast({
      title: "Dados excluídos",
      description: "Todas as suas informações foram removidas.",
      variant: "destructive",
    });
  };

  if (!userData) {
    return (
      <main className="min-h-screen gradient-bg p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Nenhum dado encontrado</AlertTitle>
            <AlertDescription>
              Você ainda não preencheu o formulário.{' '}
              <Link href="/formulario" className="underline">
                Clique aqui para começar
              </Link>
            </AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen gradient-bg p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Perfil</h1>
          <ThemeToggle />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
            {lastPlanId && (
              <Link href={`/resultados?id=${lastPlanId}`}>
                <Button 
                  variant="secondary" 
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  <Utensils className="mr-2 h-4 w-4" />
                  Minha Dieta
                </Button>
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleSave} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            >
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDelete}
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Dados
            </Button>
          </div>
        </div>

        <ScrollArea className="rounded-lg">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                Dados Pessoais
              </CardTitle>
              <CardDescription>Suas informações básicas</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={userData.nome}
                  onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idade">Idade</Label>
                <Input
                  id="idade"
                  type="number"
                  value={userData.idade}
                  onChange={(e) => setUserData({ ...userData, idade: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input
                  id="peso"
                  type="number"
                  value={userData.peso}
                  onChange={(e) => setUserData({ ...userData, peso: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="altura">Altura (cm)</Label>
                <Input
                  id="altura"
                  type="number"
                  value={userData.altura}
                  onChange={(e) => setUserData({ ...userData, altura: Number(e.target.value) })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6" />
                Atividade e Objetivos
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nivelAtividade">Nível de Atividade</Label>
                <Select
                  value={userData.nivelAtividade}
                  onValueChange={(value: any) => setUserData({ ...userData, nivelAtividade: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentário</SelectItem>
                    <SelectItem value="leveAtivo">Levemente Ativo</SelectItem>
                    <SelectItem value="moderadamenteAtivo">Moderadamente Ativo</SelectItem>
                    <SelectItem value="muitoAtivo">Muito Ativo</SelectItem>
                    <SelectItem value="extremamenteAtivo">Extremamente Ativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="objetivo">Objetivo</Label>
                <Select
                  value={userData.objetivo}
                  onValueChange={(value: any) => setUserData({ ...userData, objetivo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perderPeso">Perder Peso</SelectItem>
                    <SelectItem value="manterPeso">Manter Peso</SelectItem>
                    <SelectItem value="ganharPeso">Ganhar Peso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Rotina
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="horaAcordar">Hora de Acordar</Label>
                <Input
                  id="horaAcordar"
                  type="time"
                  value={userData.horaAcordar}
                  onChange={(e) => setUserData({ ...userData, horaAcordar: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horaDormir">Hora de Dormir</Label>
                <Input
                  id="horaDormir"
                  type="time"
                  value={userData.horaDormir}
                  onChange={(e) => setUserData({ ...userData, horaDormir: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-6 w-6" />
                Preferências Alimentares
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Restrições Alimentares</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {userData?.restricoesAlimentares?.map((restricao, index) => (
                    <Badge key={index} variant="secondary">
                      {restricao}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Alergias</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {userData?.alergias?.map((alergia, index) => (
                    <Badge key={index} variant="destructive">
                      {alergia}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Preferências</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {userData?.preferenciasAlimentares?.map((preferencia, index) => (
                    <Badge key={index} variant="outline">
                      {preferencia}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 mb-6 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                Orçamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="restricaoOrcamento"
                  checked={userData.restricaoOrcamento}
                  onCheckedChange={(checked) => 
                    setUserData({ ...userData, restricaoOrcamento: checked })
                  }
                />
                <Label htmlFor="restricaoOrcamento">Tenho restrição de orçamento</Label>
              </div>
              {userData.restricaoOrcamento && (
                <div className="space-y-2">
                  <Label htmlFor="orcamentoMensal">Orçamento Mensal (R$)</Label>
                  <Input
                    id="orcamentoMensal"
                    type="number"
                    value={userData.orcamentoMensal}
                    onChange={(e) => 
                      setUserData({ ...userData, orcamentoMensal: Number(e.target.value) })
                    }
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </ScrollArea>
      </div>
    </main>
  );
}
