import { createRootRoute, Outlet } from '@tanstack/react-router';
import React, { Suspense } from 'react';

export const Route = createRootRoute({
  component: () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-8 h-8 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div></div>}>
      <Outlet />
    </Suspense>
  ),
});
