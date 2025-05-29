'use client';
import { createContext, useContext } from 'react';
import { configure } from 'mobx';
import AppConfigStore from './AppConfig';
import AuthStore from './AuthStore';
import PatientStore from './PatientStore';
import LabTechStore from './LabTechStore';
import LabCoordStore from './LabCoordStore';
import CartStore from './CartStore';
import TestStore from './TestStore';
import ReceptionistStore from './ReceptionistStore';
import AdminStore from './AdminStore';

configure({
  enforceActions: 'observed',
  computedRequiresReaction: true
});

interface StoreProviderProps {
  children: React.ReactNode;
}

export class RootStore {
  AdminStore: AdminStore;
  AppConfigStore: AppConfigStore;
  AuthStore: AuthStore;
  PatientStore: PatientStore;
  LabTechStore: LabTechStore;
  LabCoordStore: LabCoordStore;
  CartStore: CartStore;
  TestStore: TestStore;
  ReceptionistStore: ReceptionistStore;

  constructor() {
    this.AdminStore = new AdminStore(this);
    this.AppConfigStore = new AppConfigStore(this);
    this.AuthStore = new AuthStore(this);
    this.PatientStore = new PatientStore(this);
    this.LabTechStore = new LabTechStore(this);
    this.LabCoordStore = new LabCoordStore(this);
    this.ReceptionistStore = new ReceptionistStore(this);
    this.CartStore = new CartStore(this);
    this.TestStore = new TestStore(this);
  }
}

export const Stores = new RootStore();
const StoreContext = createContext<RootStore>(Stores);

export const StoreProvider = ({ children }: StoreProviderProps) => (
  <StoreContext.Provider value={Stores}>{children}</StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);
