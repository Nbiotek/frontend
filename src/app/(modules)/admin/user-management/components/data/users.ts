import { faker } from '@faker-js/faker';

export const users = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = faker.person.fullName({ firstName, lastName });

  return {
    id: faker.string.uuid(),
    fullName,
    email: faker.internet.email({ firstName, lastName }).toLocaleLowerCase(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    status: faker.helpers.arrayElement(['active', 'inactive', 'invited', 'suspended']),
    role: faker.helpers.arrayElement([
      'superadmin',
      'receptionist',
      'labcoordinator',
      'labtechnician',
      'marketer',
      'referaldoctor',
      'doctor',
      'technicalcoordinator'
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
});
