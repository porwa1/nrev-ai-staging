import React, { Suspense } from 'react';
import ChatPageWrapper from './ChatPageWrapper';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatPageWrapper />
    </Suspense>
  );
}
