import { UserData } from '@/types/form';

export function buildSystemPrompt(): string {
  return `Você é um assistente nutricionista especializado e experiente, focado em criar planos alimentares personalizados e individualizados.
Seu objetivo é analisar os dados do usuário e gerar um plano alimentar detalhado e personalizado que:
- Seja adequado aos objetivos e metas do usuário
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
    deslocamentoPrincipal,
    tempoDeslocamento,
    descricaoRotina,
    rotinaSonoConsistente,
    qualidadeSono,
    periodoTrabalhoEstudo,
    localTrabalho,
    nivelEstresse,
    frequenciaLazer,
    rotinaPermiteSaudavel,
    desejasMudarRotina,
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
Dados do Usuário:
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

Rotina Diária:
- Horário de acordar: ${horaAcordar}
- Horário de dormir: ${horaDormir}
- Meio de deslocamento: ${deslocamentoPrincipal}
- Tempo de deslocamento: ${tempoDeslocamento}
- Descrição da rotina: ${descricaoRotina}

Hábitos de Sono:
- Consistência nos horários: ${rotinaSonoConsistente}
- Qualidade do sono: ${qualidadeSono}

Trabalho/Estudo:
- Período diário: ${periodoTrabalhoEstudo}
- Local: ${localTrabalho}

Estresse e Bem-estar:
- Nível de estresse: ${nivelEstresse}
- Frequência de lazer: ${frequenciaLazer}

Avaliação do Estilo de Vida:
- Permite vida saudável: ${rotinaPermiteSaudavel}
- Deseja mudar: ${desejasMudarRotina}

${restricaoOrcamento ? `Orçamento mensal: R$ ${orcamentoMensal}` : 'Sem restrição de orçamento'}

Restrições Alimentares:
${restricoesAlimentares?.length ? restricoesAlimentares.join(', ') : 'Nenhuma'}

Alergias:
${alergias?.length ? alergias.join(', ') : 'Nenhuma'}

Preferências Alimentares:
${preferenciasAlimentares?.length ? preferenciasAlimentares.join(', ') : 'Nenhuma'}

Por favor, crie um plano alimentar personalizado considerando todos estes fatores, incluindo:
1. Distribuição de macronutrientes recomendada e gramatura para cada refeição
2. Plano de refeições diário com 4-6 refeições, adaptado aos horários e rotina do usuário
3. Lista de alimentos recomendados para cada refeição
4. Dicas práticas para preparação de refeições considerando a disponibilidade de tempo
5. Alternativas para as refeições principais
6. Recomendações específicas baseadas no objetivo e estilo de vida
7. Sugestões para melhorar a qualidade do sono e gerenciar o estresse através da alimentação`;
}