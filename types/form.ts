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
  
  // Dietary Restrictions
  restricoesAlimentares: string[];
  alergias: string[];
  preferenciasAlimentares: string[];
}

export type FormStep = 'personal' | 'activity' | 'goals' | 'lifestyle' | 'dietary' | 'summary';