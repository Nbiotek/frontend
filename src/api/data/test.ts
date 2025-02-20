import { SingleTest, PackageTest } from '@/types/test';

export const individualTests: SingleTest[] = [
  {
    id: 'CBC001',
    name: 'Complete Blood Count (CBC)',
    description:
      'Measures different components of blood including red cells, white cells, and platelets. Helps evaluate overall health and screen for various disorders.',
    price: 150,
    category: 'Blood Test',
    requirements: [
      'Fasting not required',
      'Avoid strenuous exercise 24 hours before test',
      'Inform lab about any medications'
    ],
    type: 'single'

    // imageUrl: "/images/tests/cbc.png"
  },
  {
    id: 'LFT002',
    name: 'Liver Function Test',
    description:
      'Measures various proteins, enzymes, and substances in blood to evaluate liver health and function.',
    price: 200,
    category: 'Liver Test',
    // duration: "2-3 hours",
    requirements: [
      '8-12 hours fasting required',
      'No alcohol 24 hours before test',
      'Morning appointment recommended'
    ],
    type: 'single'
  },
  {
    id: 'TH003',
    name: 'Thyroid Profile',
    description:
      'Evaluates thyroid function by measuring various hormone levels. Helps diagnose thyroid disorders.',
    price: 300,
    // duration: "3-4 hours",
    category: 'Kidney',
    requirements: [
      'Morning appointment recommended',
      'Fasting not required',
      'Inform about thyroid medications'
    ],
    type: 'single'
  },
  {
    id: 'LIP004',
    name: 'Lipid Profile',
    description:
      'Measures different types of fats in blood including cholesterol and triglycerides.',
    price: 18000,
    // duration: "2-3 hours",
    category: 'Kidney',
    requirements: [
      '12 hours fasting required',
      'Avoid fatty foods 24 hours before',
      'Morning appointment recommended'
    ],
    type: 'single'
  },
  {
    id: 'KFT005',
    name: 'Kidney Function Test',
    description: 'Evaluates how well kidneys are working by measuring various substances in blood.',
    price: 20000,
    category: 'Kidney',
    requirements: [
      '12 hours fasting recommended',
      'Normal water intake',
      'Avoid high-protein meals before test'
    ],
    type: 'single'
  },
  {
    id: 'GLU006',
    name: 'Blood Glucose Test',
    description: 'Measures blood sugar levels to diagnose or monitor diabetes.',
    price: 12000,
    category: 'Blood Test',
    requirements: [
      '8 hours fasting required for FBS',
      'Bring your glucometer if you have one',
      'Regular medications as advised by doctor'
    ],
    type: 'single'
  }
];

export const testPackages: PackageTest[] = [
  {
    id: 'BASIC001',
    name: 'Basic Health Checkup',
    description:
      'Essential health screening package including basic blood, liver, and kidney function tests.',
    tests: [
      individualTests[0], // CBC
      individualTests[3], // Lipid Profile
      individualTests[4] // Kidney Function
    ],
    price: 65000,
    discountedPrice: 55000,
    type: 'package'
  },
  {
    id: 'COMP002',
    name: 'Comprehensive Health Screening',
    description:
      'Complete health assessment including all major organ function tests and blood analysis.',
    tests: [
      individualTests[0], // CBC
      individualTests[1], // Liver Function
      individualTests[2], // Thyroid Profile
      individualTests[3], // Lipid Profile
      individualTests[4], // Kidney Function
      individualTests[5] // Blood Glucose
    ],
    price: 112000,
    discountedPrice: 95000
  },
  {
    id: 'DIAB003',
    name: 'Diabetes Care Package',
    description: 'Comprehensive diabetes screening and monitoring tests.',
    tests: [
      individualTests[5], // Blood Glucose
      individualTests[3], // Lipid Profile
      individualTests[4] // Kidney Function
    ],
    price: 50000,
    discountedPrice: 42000,
    type: 'package'
  },
  {
    id: 'CARD004',
    name: 'Cardiac Risk Assessment',
    description: 'Essential tests to evaluate heart health and cardiac risk factors.',
    tests: [
      individualTests[3], // Lipid Profile
      individualTests[0], // CBC
      individualTests[5] // Blood Glucose
    ],
    price: 45000,
    discountedPrice: 38000,
    type: 'package'
  }
];
