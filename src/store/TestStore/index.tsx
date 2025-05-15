import { makeAutoObservable, runInAction } from 'mobx';
import { TestService } from '@/requests/test';
import { SingleTest, PackageTest, AllTestResponse, AllPackageTestResponse } from '@/types/test';
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
    // Mark rootStore as non-observable to avoid SSR issues
    makeAutoObservable(this, {
      rootStore: false
    });

    this.rootStore = rootStore;

    // Only auto-fetch on client side to avoid SSR issues
    if (typeof window !== 'undefined') {
      this.fetchInitialData();
    }
  }

  fetchInitialData() {
    this.fetchSingleTests();
    this.fetchPackageTests();
  }

  // Fetch single tests
  async fetchSingleTests() {
    // Skip if already loading or if loaded and not forced
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
    // Skip if already loading or if loaded and not forced
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

  // Get a single test by ID
  getSingleTestById(id: string | number): SingleTest | undefined {
    // Auto-fetch if data isn't loaded yet
    if (!this.singleTestsLoaded && !this.isLoadingSingleTests) {
      this.fetchSingleTests();
    }
    return this.singleTests.find((test) => test.id === id);
  }

  // Get a package test by ID
  getPackageTestById(id: string | number): PackageTest | undefined {
    // Auto-fetch if data isn't loaded yet
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
