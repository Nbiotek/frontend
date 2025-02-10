'use client';
import ModalsBank from '@/components/modalsBank';
import ReactQueryProvider from '@/requests/query.tanstack';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreProvider } from '@/store';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ReactQueryProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-right" />
        <ModalsBank />
      </ReactQueryProvider>
    </StoreProvider>
  );
}
