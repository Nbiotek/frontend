import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '..';

export class LabCoordStore {
  rootStore: RootStore;

  testQuery: Partial<TTestQuery> = { limit: 10, page: 1 };
  qcPendingQuery: Partial<TTestQuery> = { limit: 10, page: 1 };
  qcHistoryQuery: Partial<TTestQuery> = { limit: 10, page: 1 };

  constructor(_rootStore: RootStore) {
    this.rootStore = _rootStore;

    makeObservable(this, {
      testQuery: observable,
      qcPendingQuery: observable,
      qcHistoryQuery: observable,

      applyTestQuery: action.bound,
      resetTestQuery: action.bound,
      setTestLimit: action.bound,
      setTestPage: action.bound,
      applyQcHistoryQuery: action.bound,
      applyQcPendingQuery: action.bound
    });
  }

  applyTestQuery(_query: Partial<TTestQuery>) {
    this.testQuery = { ...this.testQuery, ..._query };
  }

  resetTestQuery() {
    const { limit, page } = this.testQuery;
    this.testQuery = { limit, page };
  }

  setTestPage(_page: number) {
    this.testQuery.page = _page;
  }

  setTestLimit(_limit: number) {
    this.testQuery.limit = _limit;
  }

  applyQcHistoryQuery(_query: Partial<TTestQuery>) {
    this.qcHistoryQuery = { ...this.qcHistoryQuery, ..._query };
  }

  applyQcPendingQuery(_query: Partial<TTestQuery>) {
    this.qcPendingQuery = { ...this.qcPendingQuery, ..._query };
  }
}
