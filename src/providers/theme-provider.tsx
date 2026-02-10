'use client';

import * as React from 'react';

export interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Simple passthrough or basic theme logic if needed.
  // For now, just render children to remove next-themes dependency.
  return <>{children}</>;
}
