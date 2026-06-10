'use client';

import { AuthProvider } from './provider';
import { ReactNode } from 'react';

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}