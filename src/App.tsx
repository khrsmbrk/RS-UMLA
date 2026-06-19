import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { registerSW } from "./pwaSetup";
import { FirebaseProvider } from "./FirebaseProvider";

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  useEffect(() => {
    registerSW();
  }, []);

  return (
    <FirebaseProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <RouterProvider router={router} />
    </FirebaseProvider>
  );
}

export default App;
