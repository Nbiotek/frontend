'use client';
import { createContext, useContext } from 'react';
import { configure } from 'mobx';
import AppConfigStore from './AppConfig';
import AuthStore from './AuthStore';
import PatientStore from './PatientStore';
import LabTechStore from './LabTechStore';
import LabCoordStore from './LabCoordStore';
import CartStore from './CartStore';

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
  LabTechStore: LabTechStore;
  LabCoordStore: LabCoordStore;
  CartStore: CartStore;

  constructor() {
    this.AppConfigStore = new AppConfigStore(this);
    this.AuthStore = new AuthStore(this);
    this.PatientStore = new PatientStore(this);
    this.LabTechStore = new LabTechStore(this);
    this.LabCoordStore = new LabCoordStore(this);
    this.CartStore = new CartStore(this);
  }
}

export const Stores = new RootStore();
const StoreContext = createContext<RootStore>(Stores);

export const StoreProvider = ({ children }: StoreProviderProps) => (
  <StoreContext.Provider value={Stores}>{children}</StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);
