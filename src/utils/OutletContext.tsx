import React, { createContext, useContext } from 'react';

// Create generic contexts for the portal layouts

export const PatientContext = createContext<{ patient: any } | null>(null);

export function usePatientContext() {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error('usePatientContext must be used within PatientLayout');
  return ctx;
}

export const KaryawanContext = createContext<{ user: any } | null>(null);

export function useKaryawanContext() {
  const ctx = useContext(KaryawanContext);
  if (!ctx) throw new Error('useKaryawanContext must be used within PortalKaryawanLayout');
  return ctx;
}

// Emulate useOutletContext for legacy components that were migrating
// In Tanstack Router we pass via React Context instead
export function useOutletContext<T = any>(): T {
  // A bit hacky, but since there are two contexts, we check which one is active
  const patient = useContext(PatientContext);
  if (patient) return patient as unknown as T;
  
  const karyawan = useContext(KaryawanContext);
  if (karyawan) return karyawan as unknown as T;
  
  return {} as T;
}
