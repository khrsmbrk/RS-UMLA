import { createFileRoute } from '@tanstack/react-router';
import React, { Suspense } from 'react';

const Component = React.lazy(() => import('../pages/SRM/SRMLayout'));

export const Route = createFileRoute('//srm')({
  component: () => (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <Component />
    </Suspense>
  )
});
