import { UserData } from '@/types/form';

export function buildSystemPrompt(): string {
  return `Você é um assistente nutricionista especializado e experiente, focado em criar planos alimentares personalizados e individualizados.
Seu objetivo é analisar os dados do usuário e gerar um plano alimentar detalhado e personalizado que:
- Seja adequado aos objetivos do usuário
- Respeite suas restrições alimentares e alergias
- Considere suas preferências alimentares
- Esteja dentro do orçamento especificado (quando aplicável)
- Seja adaptado ao seu estilo de vida e rotina
- Inclua recomendações específicas e práticas
- Forneça alternativas para as refeições principais`;
}

export function buildUserPrompt(userData: UserData): string {
  const {
    nome,
    idade,
    genero,
    peso,
    altura,
    nivelAtividade,
    objetivo,
    horaAcordar,
    horaDormir,
    restricaoOrcamento,
    orcamentoMensal,
    restricoesAlimentares,
    alergias,
    preferenciasAlimentares,
  } = userData;

  // Calcular IMC
  const imc = peso / ((altura / 100) * (altura / 100));

  // Calcular TMB (Taxa Metabólica Basal) usando a fórmula de Harris-Benedict
  let tmb;
  if (genero === 'masculino') {
    tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
  } else {
    tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
  }

  // Fator de atividade
  const fatoresAtividade = {
    sedentario: 1.2,
    leveAtivo: 1.375,
    moderadamenteAtivo: 1.55,
    muitoAtivo: 1.725,
    extremamenteAtivo: 1.9,
  };

  // Calcular TDEE (Gasto Energético Total Diário)
  const tdee = tmb * fatoresAtividade[nivelAtividade];

  return `
Dados do Paciente:
- Nome: ${nome}
- Idade: ${idade} anos
- Gênero: ${genero}
- Peso: ${peso}kg
- Altura: ${altura}cm
- IMC: ${imc.toFixed(2)}
- TMB: ${tmb.toFixed(0)} calorias
- TDEE: ${tdee.toFixed(0)} calorias

Nível de Atividade: ${nivelAtividade}
Objetivo: ${objetivo}

Rotina:
- Horário de acordar: ${horaAcordar}
- Horário de dormir: ${horaDormir}

${restricaoOrcamento ? `Orçamento mensal: R$ ${orcamentoMensal}` : 'Sem restrição de orçamento'}

Restrições Alimentares:
${restricoesAlimentares?.length ? restricoesAlimentares.join(', ') : 'Nenhuma'}

Alergias:
${alergias?.length ? alergias.join(', ') : 'Nenhuma'}

Preferências Alimentares:
${preferenciasAlimentares?.length ? preferenciasAlimentares.join(', ') : 'Nenhuma'}

Por favor, crie um plano alimentar personalizado considerando todos estes fatores, incluindo:
1. Distribuição de macronutrientes recomendada
2. Plano de refeições diário com 4-6 refeições
3. Lista de alimentos recomendados
4. Dicas práticas para preparação
5. Alternativas para as refeições principais
6. Recomendações específicas baseadas no objetivo`;
}