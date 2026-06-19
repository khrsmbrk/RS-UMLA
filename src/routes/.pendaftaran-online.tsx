import { createFileRoute } from '@tanstack/react-router';
import React, { Suspense } from 'react';

const Component = React.lazy(() => import('../pages/PendaftaranOnline/PendaftaranOnline'));

export const Route = createFileRoute('//pendaftaran-online')({
  component: () => (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <Component />
    </Suspense>
  )
});
