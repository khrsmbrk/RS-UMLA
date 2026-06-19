import { createFileRoute } from '@tanstack/react-router';
import React, { Suspense } from 'react';

const Component = React.lazy(() => import('../pages/Office/OfficeArchive'));

export const Route = createFileRoute('/archive')({
  component: () => (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <Component />
    </Suspense>
  )
});
