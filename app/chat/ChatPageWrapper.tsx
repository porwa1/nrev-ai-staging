'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import ChatPage from '../components/ChatPage';

export default function ChatPageWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialMessage = searchParams.get('initial') ?? '';

  return (
    <ChatPage
      initialMessage={initialMessage}
      onBack={() => router.push('/')}
    />
  );
} 