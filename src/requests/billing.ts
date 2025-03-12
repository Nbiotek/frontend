import server, { serverwithoutInterceptor } from '.';
import { PATIENT } from '@/constants/api';

export const BillingService = {
  // Get all Test Resuslt
  getBillingHistory: async () => {
    const { data } = await server.get<BillingHistory>(PATIENT.BILLING);
    return data;
  }
};
