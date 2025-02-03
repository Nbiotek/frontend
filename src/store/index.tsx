'use client';
import { createContext, useContext } from 'react';
import { configure } from 'mobx';
import { AppConfigStore } from './AppConfigStore';

configure({
  enforceActions: 'observed',
  computedRequiresReaction: true
});

interface StoreProviderProps {
  children: React.ReactNode;
}

export class RootStore {
  AppConfigStore: AppConfigStore;
  constructor() {
    this.AppConfigStore = new AppConfigStore(this);
  }
}

export const Stores = new RootStore();
const StoreContext = createContext<RootStore>(Stores);

export const StoreProvider = ({ children }: StoreProviderProps) => (
  <StoreContext.Provider value={Stores}>{children}</StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);
