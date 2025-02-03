import ModalsBank from '@/components/modalsBank';
import { StoreProvider } from '@/store';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <>
        <ModalsBank />
      </>
    </StoreProvider>
  );
}
