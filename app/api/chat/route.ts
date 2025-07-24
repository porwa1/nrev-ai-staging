import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Prepare the system message to structure GPT's response
    const systemMessage = `You are an nRev AI assistant helping with GTM (Go-To-Market) automation. 
    Your task is to provide a concise, actionable response (max 1-3 paragraphs).

    Guidelines:
    - Keep responses brief but informative
    - Use markdown for clear formatting (## for h2, - for bullets)
    - Focus on actionable insights
    - Be direct and specific
    - Respond quickly and efficiently`;

    // Call GPT-4 with optimized parameters
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt }
      ],
      temperature: 0,
      max_tokens: 1000,
    });

    const message = completion.choices[0].message.content;
    if (!message) {
      throw new Error('No response from GPT');
    }

    return NextResponse.json({ message });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
} 