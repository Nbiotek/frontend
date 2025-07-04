import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import { TRemoteFile } from '@/app/(modules)/lab-tech/tests/components/validation';

export enum EnumLabTechQueryType {
  TEST = 'TEST',
  RESULT = 'RESULT',
  ARCHIVED = 'ARCHIVED',
  CONTROL_HISTORY = 'CONTROL_HISTORY',
  CONTROL_PENDING = 'CONTROL_PENDING'
}

const defaultQuery = { limit: 10, page: 1 };

class LabTechStore {
  rootStore: RootStore;
  queries: Record<EnumLabTechQueryType, Partial<TTestQuery>> = {
    [EnumLabTechQueryType.TEST]: { ...defaultQuery },
    [EnumLabTechQueryType.RESULT]: { ...defaultQuery },
    [EnumLabTechQueryType.ARCHIVED]: { ...defaultQuery },
    [EnumLabTechQueryType.CONTROL_HISTORY]: { ...defaultQuery },
    [EnumLabTechQueryType.CONTROL_PENDING]: { ...defaultQuery }
  };
  testFiles: Array<TRemoteFile> = [];

  constructor(_rootStore: RootStore) {
    this.rootStore = _rootStore;

    makeObservable(this, {
      queries: observable,
      testFiles: observable,
      addTestFiles: observable,
      removeTestFiles: observable,
      setTestFiles: observable,

      applyQuery: action.bound,
      resetQuery: action.bound,
      setLimit: action.bound,
      setPage: action.bound
    });
  }

  applyQuery(
    _query: Partial<TTestQuery>,
    dataType: EnumLabTechQueryType = EnumLabTechQueryType.TEST
  ) {
    this.queries[dataType] = { ...this.queries[dataType], ..._query };
  }

  resetQuery(dataType: EnumLabTechQueryType = EnumLabTechQueryType.TEST) {
    const { limit, page } = this.queries[dataType];
    this.queries[dataType] = { limit, page };
  }

  setPage(_page: number, dataType: EnumLabTechQueryType = EnumLabTechQueryType.TEST) {
    this.queries[dataType].page = _page;
  }

  setLimit(_limit: number, dataType: EnumLabTechQueryType = EnumLabTechQueryType.TEST) {
    this.queries[dataType].limit = _limit;
  }

  addTestFiles(_testFiles: TRemoteFile) {
    this.testFiles.push(_testFiles);
  }

  removeTestFiles = (uuid: string) => {
    this.testFiles = this.testFiles.filter((file) => file.uuid !== uuid);
  };

  setTestFiles = (_testFiles: Array<TRemoteFile>) => {
    this.testFiles = _testFiles;
  };
}

export default LabTechStore;
