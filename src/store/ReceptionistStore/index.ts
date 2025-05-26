import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '..';

export enum EnumReceptionistQueryType {
  PENDING_APPOINTMENTS = 'PENDING_APPOINTMENTS',
  REG_PATIENTS = 'REG_PATIENTS'
}

const defaultQuery = { limit: 10, page: 1 };

class ReceptionistStore {
  rootStore: RootStore;
  queries: Record<EnumReceptionistQueryType, Partial<TReceptionistQuery>> = {
    [EnumReceptionistQueryType.PENDING_APPOINTMENTS]: { ...defaultQuery },
    [EnumReceptionistQueryType.REG_PATIENTS]: { ...defaultQuery }
  };

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
    dataType: EnumReceptionistQueryType = EnumReceptionistQueryType.PENDING_APPOINTMENTS
  ) {
    this.queries[dataType] = { ...this.queries[dataType], ..._query };
  }

  resetQuery(dataType: EnumReceptionistQueryType = EnumReceptionistQueryType.PENDING_APPOINTMENTS) {
    const { limit, page } = this.queries[dataType];
    this.queries[dataType] = { limit, page };
  }

  setPage(
    _page: number,
    dataType: EnumReceptionistQueryType = EnumReceptionistQueryType.PENDING_APPOINTMENTS
  ) {
    this.queries[dataType].page = _page;
  }

  setLimit(
    _limit: number,
    dataType: EnumReceptionistQueryType = EnumReceptionistQueryType.PENDING_APPOINTMENTS
  ) {
    this.queries[dataType].limit = _limit;
  }
}

export default ReceptionistStore;
