import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Safely access the env variable holding the base URL for the NurtureV API
  const baseUrl = process.env.NURTUREV_API_BASE_URL;

  // If the variable is not defined we do NOT expose internals to the client
  if (!baseUrl) {
    console.error('Missing NURTUREV_API_BASE_URL environment variable');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    // Extract the email from the incoming request
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request. Please provide a valid email.' },
        { status: 400 }
      );
    }

    // Forward the request to the NurtureV backend
    const response = await fetch(`${baseUrl}/user/submit-website-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, form_type: 'waitlist' }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    // Handle known client errors from the upstream service gracefully
    if (response.status === 400) {
      return NextResponse.json(
        { error: 'Invalid email address. Please check and try again.' },
        { status: 400 }
      );
    }

    // For any other upstream error we mask the error to the frontend
    console.error('Upstream error when submitting waitlist:', await response.text());
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Unhandled error in submit-waitlist route:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
} 