'use client';
import { createContext, useContext } from 'react';
import { configure } from 'mobx';
import { AppConfigStore } from './AppConfig';
import { AuthStore } from './Auth';
import { PatientStore } from './Patient';

configure({
  enforceActions: 'observed',
  computedRequiresReaction: true
});

interface StoreProviderProps {
  children: React.ReactNode;
}

export class RootStore {
  AppConfigStore: AppConfigStore;
  AuthStore: AuthStore;
  PatientStore: PatientStore;

  constructor() {
    this.AppConfigStore = new AppConfigStore(this);
    this.AuthStore = new AuthStore(this);
    this.PatientStore = new PatientStore(this);
  }
}

export const Stores = new RootStore();
const StoreContext = createContext<RootStore>(Stores);

export const StoreProvider = ({ children }: StoreProviderProps) => (
  <StoreContext.Provider value={Stores}>{children}</StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);
