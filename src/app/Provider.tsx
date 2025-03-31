'use client';
import ModalsBank from '@/components/modalsBank';
import ReactQueryProvider from '@/requests/query.tanstack';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreProvider } from '@/store';
import { Toaster } from 'react-hot-toast';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <ReactQueryProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        <ModalsBank />
      </ReactQueryProvider>
    </StoreProvider>
  );
}
