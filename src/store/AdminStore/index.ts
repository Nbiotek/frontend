import { action, flow, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import store from 'store2';
import { TAdminAdduserSchema } from '@/app/(modules)/admin/user-management/validation';
import initializer from '@/utils/initializer';
import { parseError } from '@/utils/errorHandler';
import toast from 'react-hot-toast';
import { postAdduser, postAddSingleTest, IPostAddSingleTest } from '@/requests/admin';
import { AxiosResponse } from 'axios';
import { TAdminSingleTestSchema } from '@/app/(modules)/admin/content-management/components/modals/validation';

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

const INIT_IS_LOADING = {
  add_user: false,
  single_test: false
};

class AdminStore {
  rootStore: RootStore;
  defaultquery = { limit: 10, page: 1 };
  queries: Record<EnumAdminQueryType, Partial<TGeneralPaginatedQuery>> = {
    [EnumAdminQueryType.USERS]: { ...this.defaultquery }
  };
  isLoading = { ...INIT_IS_LOADING };
  errors = initializer(this.isLoading, '');

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      queries: observable,
      defaultquery: observable,

      applyQuery: action.bound,
      resetQuery: action.bound,
      setLimit: action.bound,
      setPage: action.bound,

      addUser: flow.bound,
      addSingleTest: flow.bound
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

  *addUser(_payload: TAdminAdduserSchema, cb?: () => void) {
    this.isLoading.add_user = true;
    this.errors.add_user = '';
    try {
      const resp = (yield postAdduser(_payload)) as AxiosResponse<INBTServerResp<string>>;
      toast.success(resp.data.message);

      cb?.();
    } catch (error) {
      this.errors.add_user = parseError(error);
      toast.error(this.errors.add_user);
    } finally {
      this.isLoading.add_user = false;
    }
  }

  *addSingleTest(_payload: TAdminSingleTestSchema, cb?: () => void) {
    this.isLoading.single_test = true;
    this.errors.single_test = '';
    try {
      const payload: IPostAddSingleTest = {
        name: _payload.name,
        description: _payload.description,
        category: _payload.category,
        price: parseInt(_payload.price.replace(/[^0-9]/g, '')),
        discountedPrice: _payload.discountedPrice
          ? parseInt(_payload.discountedPrice.replace(/[^0-9]/g, ''))
          : 0,
        requirements: _payload.requirements?.split(',') || []
      };

      yield postAddSingleTest(payload);
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.single_test = false;
    }
  }
}

export default AdminStore;
