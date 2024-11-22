import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buildSystemPrompt, buildUserPrompt } from '@/lib/prompt-builder';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const userData = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserPrompt(userData) },
      ],
    });

    return NextResponse.json({
      plan: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error generating plan:', error);
    return NextResponse.json(
      { error: 'Falha ao gerar o plano alimentar' },
      { status: 500 }
    );
  }
}