'use client';

import { useForm } from '../useFormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Clock, Wallet, Car, Calendar, Brain, Briefcase, Heart, Clock4 } from 'lucide-react';
import FormLayout from './FormLayout';
import { UserData } from '@/types/form';

export function LifestyleForm() {
  const { data, updateData, nextStep, previousStep } = useForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const handleSelectChange = <K extends keyof UserData>(
    field: K,
    value: UserData[K]
  ) => {
    updateData({ [field]: value });
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rotina Diária */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Rotina Diária</h3>
          
          <div className="space-y-2">
            <Label htmlFor="deslocamentoPrincipal" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Principal meio de deslocamento
            </Label>
            <Select
              value={data.deslocamentoPrincipal}
              onValueChange={(value: UserData['deslocamentoPrincipal']) => 
                handleSelectChange('deslocamentoPrincipal', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carro">Carro</SelectItem>
                <SelectItem value="transportePublico">Transporte Público</SelectItem>
                <SelectItem value="bicicleta">Bicicleta</SelectItem>
                <SelectItem value="caminhada">Caminhada</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tempoDeslocamento" className="flex items-center gap-2">
              <Clock4 className="h-4 w-4" />
              Tempo de deslocamento diário
            </Label>
            <Select
              value={data.tempoDeslocamento}
              onValueChange={(value: UserData['tempoDeslocamento']) => 
                handleSelectChange('tempoDeslocamento', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="menos30min">Menos de 30 minutos</SelectItem>
                <SelectItem value="30a60min">30 a 60 minutos</SelectItem>
                <SelectItem value="1a2horas">1 a 2 horas</SelectItem>
                <SelectItem value="mais2horas">Mais de 2 horas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricaoRotina" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Como descreveria sua rotina?
            </Label>
            <RadioGroup
              value={data.descricaoRotina}
              onValueChange={(value: UserData['descricaoRotina']) => 
                handleSelectChange('descricaoRotina', value)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="muitoCorrida" id="r1" />
                <Label htmlFor="r1">Muito corrida</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderada" id="r2" />
                <Label htmlFor="r2">Moderada</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tranquila" id="r3" />
                <Label htmlFor="r3">Tranquila</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Hábitos de Sono */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Hábitos de Sono</h3>
          
          <div className="space-y-2">
            <Label htmlFor="horaAcordar" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Horário que costuma acordar
            </Label>
            <Input
              id="horaAcordar"
              type="time"
              value={data.horaAcordar || ''}
              onChange={(e) => updateData({ horaAcordar: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="horaDormir" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Horário que costuma dormir
            </Label>
            <Input
              id="horaDormir"
              type="time"
              value={data.horaDormir || ''}
              onChange={(e) => updateData({ horaDormir: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rotinaSonoConsistente" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Mantém horários consistentes de sono?
            </Label>
            <Select
              value={data.rotinaSonoConsistente}
              onValueChange={(value: UserData['rotinaSonoConsistente']) => 
                handleSelectChange('rotinaSonoConsistente', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">Sim, sempre</SelectItem>
                <SelectItem value="quaseSempre">Quase sempre</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Qualidade do sono
            </Label>
            <Select
              value={data.qualidadeSono}
              onValueChange={(value: UserData['qualidadeSono']) => 
                handleSelectChange('qualidadeSono', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Como avalia seu sono?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="otima">Ótima</SelectItem>
                <SelectItem value="boa">Boa</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="ruim">Ruim</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Trabalho e Estudos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Trabalho e Estudos</h3>
          
          <div className="space-y-2">
            <Label htmlFor="periodoTrabalhoEstudo" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Período diário de trabalho/estudo
            </Label>
            <Select
              value={data.periodoTrabalhoEstudo}
              onValueChange={(value: UserData['periodoTrabalhoEstudo']) => 
                handleSelectChange('periodoTrabalhoEstudo', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="menos6h">Menos de 6 horas</SelectItem>
                <SelectItem value="6a8h">6 a 8 horas</SelectItem>
                <SelectItem value="mais8h">Mais de 8 horas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="localTrabalho" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Local de trabalho/estudo
            </Label>
            <Select
              value={data.localTrabalho}
              onValueChange={(value: UserData['localTrabalho']) => 
                handleSelectChange('localTrabalho', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="homeOffice">Home Office</SelectItem>
                <SelectItem value="hibrido">Híbrido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Estresse e Bem-estar */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Estresse e Bem-estar</h3>
          
          <div className="space-y-2">
            <Label htmlFor="nivelEstresse" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Nível de estresse diário
            </Label>
            <Select
              value={data.nivelEstresse}
              onValueChange={(value: UserData['nivelEstresse']) => 
                handleSelectChange('nivelEstresse', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baixo">Baixo</SelectItem>
                <SelectItem value="moderado">Moderado</SelectItem>
                <SelectItem value="alto">Alto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequenciaLazer" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Frequência de atividades de lazer
            </Label>
            <Select
              value={data.frequenciaLazer}
              onValueChange={(value: UserData['frequenciaLazer']) => 
                handleSelectChange('frequenciaLazer', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todosDias">Todos os dias</SelectItem>
                <SelectItem value="algunsDias">Algumas vezes por semana</SelectItem>
                <SelectItem value="raramente">Raramente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Avaliação do Estilo de Vida */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Avaliação do Estilo de Vida</h3>
          
          <div className="space-y-2">
            <Label htmlFor="rotinaPermiteSaudavel" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Sua rotina permite um estilo de vida saudável?
            </Label>
            <Select
              value={data.rotinaPermiteSaudavel}
              onValueChange={(value: UserData['rotinaPermiteSaudavel']) => 
                handleSelectChange('rotinaPermiteSaudavel', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="parcialmente">Parcialmente</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desejasMudarRotina" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              O que gostaria de mudar na sua rotina?
            </Label>
            <Input
              id="desejasMudarRotina"
              type="text"
              value={data.desejasMudarRotina || ''}
              onChange={(e) => updateData({ desejasMudarRotina: e.target.value })}
              placeholder="Descreva o que gostaria de mudar..."
            />
          </div>
        </div>

        {/* Orçamento */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Orçamento</h3>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Restrição de orçamento
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                checked={data.restricaoOrcamento || false}
                onCheckedChange={(checked) => updateData({ restricaoOrcamento: checked })}
              />
              <Label>Tenho restrição de orçamento</Label>
            </div>
          </div>

          {data.restricaoOrcamento && (
            <div className="space-y-2">
              <Label htmlFor="orcamentoMensal">Orçamento mensal para alimentação (R$)</Label>
              <Input
                id="orcamentoMensal"
                type="number"
                value={data.orcamentoMensal || ''}
                onChange={(e) => updateData({ orcamentoMensal: Number(e.target.value) })}
                required
              />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" className="w-full" onClick={previousStep}>
            Anterior
          </Button>
          <Button type="submit" className="w-full">
            Próximo
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}