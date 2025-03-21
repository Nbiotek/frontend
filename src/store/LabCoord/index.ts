import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '..';

export class LabCoordStore {
  rootStore: RootStore;

  testQuery: Partial<TTestQuery> = {};
  qcPendingQuery: Partial<TTestQuery> = {};
  qcHistoryQuery: Partial<TTestQuery> = {};

  constructor(_rootStore: RootStore) {
    this.rootStore = _rootStore;

    makeObservable(this, {
      testQuery: observable,
      qcPendingQuery: observable,
      qcHistoryQuery: observable,

      applyTestQuery: action.bound,
      applyQcHistoryQuery: action.bound,
      applyQcPendingQuery: action.bound
    });
  }

  applyTestQuery(_query: Partial<TTestQuery>) {
    this.testQuery = { ...this.testQuery, ..._query };
  }

  applyQcHistoryQuery(_query: Partial<TTestQuery>) {
    this.qcHistoryQuery = { ...this.qcHistoryQuery, ..._query };
  }

  applyQcPendingQuery(_query: Partial<TTestQuery>) {
    this.qcPendingQuery = { ...this.qcPendingQuery, ..._query };
  }
}
