import { makeAutoObservable, makeObservable, runInAction } from 'mobx';
import { TestService } from '@/requests/test';
import { RootStore } from '..';

class TestStore {
  rootStore: RootStore;

  // Data state
  singleTests: SingleTest[] = [];
  packageTests: PackageTest[] = [];

  // Loading states
  isLoadingSingleTests: boolean = false;
  isLoadingPackageTests: boolean = false;

  // Error states
  singleTestsError: Error | null = null;
  packageTestsError: Error | null = null;

  // Track if data has been loaded
  singleTestsLoaded: boolean = false;
  packageTestsLoaded: boolean = false;

  constructor(rootStore: RootStore) {
    makeObservable(this, {});

    this.rootStore = rootStore;
  }

  async fetchSingleTests() {
    if (this.isLoadingSingleTests) return;

    this.isLoadingSingleTests = true;
    this.singleTestsError = null;

    try {
      const response = await TestService.getAllTests();

      runInAction(() => {
        this.singleTests = response.data.requests || [];
        this.isLoadingSingleTests = false;
        this.singleTestsLoaded = true;
      });

      return response;
    } catch (error) {
      runInAction(() => {
        this.singleTestsError = error as Error;
        this.isLoadingSingleTests = false;
      });

      throw error;
    }
  }

  // Fetch package tests
  async fetchPackageTests() {
    if (this.isLoadingPackageTests) return;

    this.isLoadingPackageTests = true;
    this.packageTestsError = null;

    try {
      const response = await TestService.getPackageTest();

      runInAction(() => {
        this.packageTests = response.data || [];
        this.isLoadingPackageTests = false;
        this.packageTestsLoaded = true;
      });

      return response;
    } catch (error) {
      runInAction(() => {
        this.packageTestsError = error as Error;
        this.isLoadingPackageTests = false;
      });

      throw error;
    }
  }

  getSingleTestById(id: string | number): SingleTest | undefined {
    if (!this.singleTestsLoaded && !this.isLoadingSingleTests) {
      this.fetchSingleTests();
    }
    return this.singleTests.find((test) => test.id === id);
  }

  getPackageTestById(id: string | number): PackageTest | undefined {
    if (!this.packageTestsLoaded && !this.isLoadingPackageTests) {
      this.fetchPackageTests();
    }
    return this.packageTests.find((pkg) => pkg.id === id);
  }

  // Clear store data (useful for logout, etc.)
  reset() {
    this.singleTests = [];
    this.packageTests = [];
    this.isLoadingSingleTests = false;
    this.isLoadingPackageTests = false;
    this.singleTestsError = null;
    this.packageTestsError = null;
    this.singleTestsLoaded = false;
    this.packageTestsLoaded = false;
  }
}

export default TestStore;
