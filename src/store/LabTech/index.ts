import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '..';

export enum EnumLabTechQueryType {
  TEST = 'TEST',
  RESULT = 'RESULT',
  ARCHIVED = 'ARCHIVED',
  CONTROL_HISTORY = 'CONTROL_HISTORY',
  CONTROL_PENDING = 'CONTROL_PENDING'
}

const defaultQuery = { limit: 10, page: 1 };

export class LabTechStore {
  rootStore: RootStore;

  testQuery: Partial<TTestQuery> = { ...defaultQuery };
  qcPendingQuery: Partial<TTestQuery> = { ...defaultQuery };
  qcHistoryQuery: Partial<TTestQuery> = { ...defaultQuery };
  resultQuery: Partial<TTestQuery> = { ...defaultQuery };
  archivedResQuery: Partial<TTestQuery> = { ...defaultQuery };

  constructor(_rootStore: RootStore) {
    this.rootStore = _rootStore;

    makeObservable(this, {
      testQuery: observable,
      qcPendingQuery: observable,
      qcHistoryQuery: observable,
      resultQuery: observable,
      archivedResQuery: observable,

      applyTestQuery: action.bound,
      resetQuery: action.bound,
      setLimit: action.bound,
      setPage: action.bound,
      applyResultQuery: action.bound,
      applyArchivedResQuery: action.bound,
      applyQcHistoryQuery: action.bound,
      applyQcPendingQuery: action.bound
    });
  }

  applyTestQuery(_query: Partial<TTestQuery>) {
    this.testQuery = { ...this.testQuery, ..._query };
  }

  resetQuery(dataType: EnumLabTechQueryType = EnumLabTechQueryType.TEST) {
    switch (dataType) {
      case EnumLabTechQueryType.TEST:
        this.testQuery = { limit: this.testQuery.limit, page: this.testQuery.page };
        break;
      case EnumLabTechQueryType.RESULT:
        this.resultQuery = { limit: this.resultQuery.limit, page: this.resultQuery.page };
        break;
      case EnumLabTechQueryType.ARCHIVED:
        this.archivedResQuery = {
          limit: this.archivedResQuery.limit,
          page: this.archivedResQuery.page
        };
        break;
      case EnumLabTechQueryType.CONTROL_HISTORY:
        this.qcHistoryQuery = { limit: this.qcHistoryQuery.limit, page: this.qcHistoryQuery.page };
        break;
      case EnumLabTechQueryType.CONTROL_PENDING:
        this.qcPendingQuery = { limit: this.qcPendingQuery.limit, page: this.qcPendingQuery.page };
        break;
      default:
        break;
    }
  }

  setPage(_page: number, dataType: EnumLabTechQueryType = EnumLabTechQueryType.TEST) {
    switch (dataType) {
      case EnumLabTechQueryType.TEST:
        this.testQuery.page = _page;
        break;
      case EnumLabTechQueryType.RESULT:
        this.resultQuery.page = _page;
        break;
      case EnumLabTechQueryType.ARCHIVED:
        this.archivedResQuery.page = _page;
        break;
      case EnumLabTechQueryType.CONTROL_HISTORY:
        this.qcHistoryQuery.page = _page;
        break;
      case EnumLabTechQueryType.CONTROL_PENDING:
        this.qcPendingQuery.page = _page;
        break;
      default:
        break;
    }
  }

  setLimit(_limit: number, dataType: EnumLabTechQueryType = EnumLabTechQueryType.TEST) {
    switch (dataType) {
      case EnumLabTechQueryType.TEST:
        this.testQuery.limit = _limit;
        break;
      case EnumLabTechQueryType.RESULT:
        this.resultQuery.limit = _limit;
        break;
      case EnumLabTechQueryType.ARCHIVED:
        this.archivedResQuery.limit = _limit;
        break;
      case EnumLabTechQueryType.CONTROL_HISTORY:
        this.qcHistoryQuery.limit = _limit;
        break;
      case EnumLabTechQueryType.CONTROL_PENDING:
        this.qcPendingQuery.limit = _limit;
        break;
      default:
        break;
    }
  }

  // TODO: All will be consolidated into a single function.
  applyResultQuery(_query: Partial<TTestQuery>) {
    this.resultQuery = { ...this.resultQuery, ..._query };
  }

  applyArchivedResQuery(_query: Partial<TTestQuery>) {
    this.archivedResQuery = { ...this.archivedResQuery, ..._query };
  }

  applyQcHistoryQuery(_query: Partial<TTestQuery>) {
    this.qcHistoryQuery = { ...this.qcHistoryQuery, ..._query };
  }

  applyQcPendingQuery(_query: Partial<TTestQuery>) {
    this.qcPendingQuery = { ...this.qcPendingQuery, ..._query };
  }
}
