export interface UserData {
  // Personal Data
  nome: string;
  idade: number;
  genero: 'masculino' | 'feminino';
  peso: number;
  altura: number;
  
  // Activity Level
  nivelAtividade: 'sedentario' | 'leveAtivo' | 'moderadamenteAtivo' | 'muitoAtivo' | 'extremamenteAtivo';
  
  // Goals
  objetivo: 'perderPeso' | 'manterPeso' | 'ganharPeso';
  
  // Lifestyle
  horaAcordar: string;
  horaDormir: string;
  restricaoOrcamento: boolean;
  orcamentoMensal?: number;
  
  // New Lifestyle Fields
  deslocamentoPrincipal: 'carro' | 'transportePublico' | 'bicicleta' | 'caminhada' | 'outro';
  tempoDeslocamento: 'menos30min' | '30a60min' | '1a2horas' | 'mais2horas';
  descricaoRotina: 'muitoCorrida' | 'moderada' | 'tranquila';
  pausasRefeicoes: boolean;
  
  // Sleep Habits
  rotinaSonoConsistente: 'sim' | 'quaseSempre' | 'nao';
  usoEletronicos: boolean;
  qualidadeSono: 'otima' | 'boa' | 'regular' | 'ruim';
  
  // Stress and Well-being
  nivelEstresse: 'baixo' | 'moderado' | 'alto';
  frequenciaLazer: 'todosDias' | 'algunsDias' | 'raramente';
  habitosRelaxamento: string[];
  
  // Work/Study
  periodoTrabalhoEstudo: 'menos6h' | '6a8h' | 'mais8h';
  intervalosTrabalho: boolean;
  localTrabalho: 'presencial' | 'homeOffice' | 'hibrido';
  
  // Lifestyle Assessment
  rotinaPermiteSaudavel: 'sim' | 'nao' | 'parcialmente';
  desejasMudarRotina: string;
  
  // Time Management
  planejamentoAtividades: 'planeja' | 'parcial' | 'semPlanejamento';
  tempoParaSi: boolean;

  // Dietary Restrictions
  restricoesAlimentares: string[];
  alergias: string[];
  preferenciasAlimentares: string[];
}

export type PartialUserData = Partial<UserData>;

export type FormStep = 'personal' | 'activity' | 'goals' | 'lifestyle' | 'dietary' | 'summary';