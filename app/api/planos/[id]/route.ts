import { NextResponse } from 'next/server';

const plans = new Map();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    plans.set(params.id, body);
    
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao salvar o plano' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const plan = plans.get(params.id);
  
  if (!plan) {
    return NextResponse.json(
      { error: 'Plano não encontrado' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(plan);
}
