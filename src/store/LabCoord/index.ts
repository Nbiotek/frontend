import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '..';

export enum EnumLabCoordQueryType {
  TEST = 'TEST',
  INVENTORY = 'INVENTORY',
  STAFF = 'STAFF',
  CONTROL_HISTORY = 'CONTROL_HISTORY',
  CONTROL_PENDING = 'CONTROL_PENDING'
}

const defaultQuery = { limit: 10, page: 1 };

export class LabCoordStore {
  rootStore: RootStore;
  queries: Record<EnumLabCoordQueryType, Partial<TTestQuery>> = {
    [EnumLabCoordQueryType.TEST]: { ...defaultQuery },
    [EnumLabCoordQueryType.INVENTORY]: { ...defaultQuery },
    [EnumLabCoordQueryType.STAFF]: { ...defaultQuery },
    [EnumLabCoordQueryType.CONTROL_HISTORY]: { ...defaultQuery },
    [EnumLabCoordQueryType.CONTROL_PENDING]: { ...defaultQuery }
  };
  inventoryQuery = {};

  constructor(_rootStore: RootStore) {
    this.rootStore = _rootStore;
    makeObservable(this, {
      queries: observable,
      applyQuery: action.bound,
      resetQuery: action.bound,
      setLimit: action.bound,
      setPage: action.bound
    });
  }

  applyQuery(
    _query: Partial<TTestQuery>,
    dataType: EnumLabCoordQueryType = EnumLabCoordQueryType.TEST
  ) {
    this.queries[dataType] = { ...this.queries[dataType], ..._query };
  }

  resetQuery(dataType: EnumLabCoordQueryType = EnumLabCoordQueryType.TEST) {
    const { limit, page } = this.queries[dataType];
    this.queries[dataType] = { limit, page };
  }

  setPage(_page: number, dataType: EnumLabCoordQueryType = EnumLabCoordQueryType.TEST) {
    this.queries[dataType].page = _page;
  }

  setLimit(_limit: number, dataType: EnumLabCoordQueryType = EnumLabCoordQueryType.TEST) {
    this.queries[dataType].limit = _limit;
  }
}
