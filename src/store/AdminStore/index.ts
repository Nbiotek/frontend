import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import store from 'store2';

export enum EnumAdminQueryType {
  USERS = 'USERS'
}

const persist = <T = string>(key: string, value: T) => {
  store.namespace('admin').session.set(key, value);
  return value;
};

const get = <T = string>(key: string, fallback?: T) => {
  return store.namespace('admin').session.get(key, fallback) as T;
};

const del = (key: string) => {
  return store.namespace('admin').session.remove(key);
};

class AdminStore {
  rootStore: RootStore;
  defaultquery = { limit: 10, page: 1 };
  queries: Record<EnumAdminQueryType, Partial<TGeneralPaginatedQuery>> = {
    [EnumAdminQueryType.USERS]: { ...this.defaultquery }
  };

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      queries: observable,
      defaultquery: observable,

      applyQuery: action.bound,
      resetQuery: action.bound,
      setLimit: action.bound,
      setPage: action.bound
    });

    this.rootStore = _rootStore;
  }

  applyQuery(
    _query: Partial<TGeneralPaginatedQuery>,
    dataType: EnumAdminQueryType = EnumAdminQueryType.USERS
  ) {
    this.queries[dataType] = { ...this.queries[dataType], ..._query };
  }

  resetQuery(dataType: EnumAdminQueryType = EnumAdminQueryType.USERS) {
    const { limit, page } = this.queries[dataType];
    this.queries[dataType] = { limit, page };
  }

  setPage(_page: number, dataType: EnumAdminQueryType = EnumAdminQueryType.USERS) {
    this.queries[dataType].page = _page;
  }

  setLimit(_limit: number, dataType: EnumAdminQueryType = EnumAdminQueryType.USERS) {
    this.queries[dataType].limit = _limit;
  }
}

export default AdminStore;
