import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '..';

export class LabTechStore {
  rootStore: RootStore;

  testQuery: Partial<TLabTechTestQuery> = {};
  qcPendingQuery: Partial<TLabTechTestQuery> = {};
  qcHistoryQuery: Partial<TLabTechTestQuery> = {};
  resultQuery: Partial<TLabTechTestQuery> = {};
  archivedResQuery: Partial<TLabTechTestQuery> = {};

  constructor(_rootStore: RootStore) {
    this.rootStore = _rootStore;

    makeObservable(this, {
      testQuery: observable,
      qcPendingQuery: observable,
      qcHistoryQuery: observable,
      resultQuery: observable,
      archivedResQuery: observable,

      applyTestQuery: action.bound,
      applyResultQuery: action.bound,
      applyArchivedResQuery: action.bound,
      applyQcHistoryQuery: action.bound,
      applyQcPendingQuery: action.bound
    });
  }

  applyTestQuery(_query: Partial<TLabTechTestQuery>) {
    this.testQuery = { ...this.testQuery, ..._query };
  }

  applyResultQuery(_query: Partial<TLabTechTestQuery>) {
    this.resultQuery = { ...this.resultQuery, ..._query };
  }

  applyArchivedResQuery(_query: Partial<TLabTechTestQuery>) {
    this.archivedResQuery = { ...this.archivedResQuery, ..._query };
  }

  applyQcHistoryQuery(_query: Partial<TLabTechTestQuery>) {
    this.qcHistoryQuery = { ...this.qcHistoryQuery, ..._query };
  }

  applyQcPendingQuery(_query: Partial<TLabTechTestQuery>) {
    this.qcPendingQuery = { ...this.qcPendingQuery, ..._query };
  }
}
