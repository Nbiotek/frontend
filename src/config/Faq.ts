export const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    name: 'General Information',
    icon: 'InfoIcon',
    description: 'Basic information about our services and how to use the patient portal'
  },
  {
    id: 'appointments',
    name: 'Appointments',
    icon: 'CalendarIcon',
    description:
      'Everything you need to know about scheduling, rescheduling and cancelling appointments'
  },
  {
    id: 'results',
    name: 'Test Results',
    icon: 'FileTextIcon',
    description: 'Information about accessing, understanding and sharing your test results'
  },
  {
    id: 'billing',
    name: 'Billing & Insurance',
    icon: 'CreditCardIcon',
    description: 'Details about payment options, insurance coverage and billing statements'
  },
  {
    id: 'account',
    name: 'Account Management',
    icon: 'UserIcon',
    description: 'How to manage your account settings, privacy and security'
  }
];

export const faqData: FAQ[] = [
  // General FAQs
  {
    id: 'faq-001',
    question: 'What is the patient portal?',
    answer:
      'The patient portal is a secure online platform that gives you 24/7 access to your health information. You can view your test results, schedule appointments, message your healthcare providers, request prescription refills, and more.',
    category: 'general',
    isPopular: true
  },
  {
    id: 'faq-002',
    question: 'How do I create an account?',
    answer:
      'To create an account, click on the "Sign Up" button on the login page. You\'ll need to provide your email address, personal information, and the enrollment token given to you by your healthcare provider. Follow the instructions to set up your username and password.',
    category: 'general',
    isPopular: true
  },
  {
    id: 'faq-003',
    question: 'Is my health information secure?',
    answer:
      'Yes, we take your privacy and security seriously. Our platform uses industry-standard encryption and security measures to protect your personal health information. We comply with HIPAA regulations and other privacy laws to ensure your data remains confidential.',
    category: 'general'
  },
  {
    id: 'faq-004',
    question: 'Can I access the portal from my mobile device?',
    answer:
      'Yes, our patient portal is fully responsive and can be accessed from any device with an internet connection, including smartphones and tablets. You can also download our mobile app for a more optimized experience.',
    category: 'general'
  },
  {
    id: 'faq-005',
    question: 'What should I do if I forget my password?',
    answer:
      'If you forget your password, click on the "Forgot Password" link on the login page. You\'ll be prompted to enter your email address, and we\'ll send you instructions to reset your password securely.',
    category: 'general'
  },

  // Appointments FAQs
  {
    id: 'faq-101',
    question: 'How do I schedule an appointment?',
    answer:
      'To schedule an appointment, log in to your account and click on the "Appointments" section. Then click "Schedule New Appointment," select your provider, choose an available date and time, and confirm your appointment details.',
    category: 'appointments',
    isPopular: true
  },
  {
    id: 'faq-102',
    question: 'How do I cancel or reschedule an appointment?',
    answer:
      'To cancel or reschedule, go to the "Appointments" section, find your appointment in the list, and click "Reschedule" or "Cancel." Please note that some appointments may require at least 24 hours notice for cancellation to avoid fees.',
    category: 'appointments',
    isPopular: true
  },
  {
    id: 'faq-103',
    question: 'Will I receive appointment reminders?',
    answer:
      'Yes, we send automated appointment reminders via email and/or text message, depending on your communication preferences. You can update these preferences in your account settings.',
    category: 'appointments'
  },
  {
    id: 'faq-104',
    question: 'Can I schedule appointments for my family members?',
    answer:
      "Yes, if you are authorized as a caregiver or have proxy access to family members' accounts, you can schedule appointments on their behalf. To set up proxy access, contact our support team or speak with your healthcare provider.",
    category: 'appointments'
  },
  {
    id: 'faq-105',
    question: 'What information do I need to provide when scheduling an appointment?',
    answer:
      "When scheduling an appointment, you'll need to provide the reason for your visit, any relevant symptoms, your insurance information, and preferred date and time slots. Having this information ready will make the scheduling process quicker and more efficient.",
    category: 'appointments'
  },

  // Test Results FAQs
  {
    id: 'faq-201',
    question: 'How quickly can I view my test results?',
    answer:
      'Most test results are available within 1-3 business days after your lab work is completed. Some specialized tests may take longer. Your results will be published to your patient portal as soon as they are reviewed by your healthcare provider.',
    category: 'results',
    isPopular: true
  },
  {
    id: 'faq-202',
    question: 'How do I access my test results?',
    answer:
      'To view your test results, log in to your account and navigate to the "Test Results" section. You\'ll see a list of your recent tests and can click on any result to view the details.',
    category: 'results'
  },
  {
    id: 'faq-203',
    question: 'What do the highlighted values on my test results mean?',
    answer:
      "Highlighted values indicate results that fall outside the normal reference range. These may appear in bold, or with colors like red or yellow. While an abnormal result doesn't always indicate a problem, it's important to discuss these with your healthcare provider.",
    category: 'results'
  },
  {
    id: 'faq-204',
    question: 'Can I download or print my test results?',
    answer:
      'Yes, you can download or print your test results for your records. When viewing a result, look for the download or print icon in the top right corner of the page.',
    category: 'results'
  },
  {
    id: 'faq-205',
    question: 'How do I share my test results with another healthcare provider?',
    answer:
      'You can share your test results with another provider through the portal. When viewing a result, click on the "Share" button and enter the provider\'s information. Alternatively, you can download the results and bring a printed copy to your appointment.',
    category: 'results'
  },

  // Billing FAQs
  {
    id: 'faq-301',
    question: 'How do I view my billing statements?',
    answer:
      'To view your billing statements, go to the "Billing" section of your patient portal. You\'ll see a list of your recent statements, and you can click on any statement to view the details.',
    category: 'billing',
    isPopular: true
  },
  {
    id: 'faq-302',
    question: 'How can I pay my bill online?',
    answer:
      'You can pay your bill online through the "Billing" section of your patient portal. Select the statement you wish to pay, click "Pay Now," and follow the instructions to complete your payment using a credit card, debit card, or bank account.',
    category: 'billing'
  },
  {
    id: 'faq-303',
    question: 'What insurance plans do you accept?',
    answer:
      'We accept most major insurance plans, including Medicare and Medicaid. For a complete list of accepted insurance providers, please visit our website or contact our billing department.',
    category: 'billing'
  },
  {
    id: 'faq-304',
    question: 'What if I have questions about my bill?',
    answer:
      'If you have questions about your bill, you can contact our billing department through the "Message" feature in your patient portal, or call our billing office directly at (555) 123-4567 during business hours.',
    category: 'billing'
  },
  {
    id: 'faq-305',
    question: 'Do you offer payment plans?',
    answer:
      'Yes, we offer flexible payment plans for patients who need assistance managing their healthcare costs. To discuss payment plan options, please contact our billing department.',
    category: 'billing'
  },

  // Account Management FAQs
  {
    id: 'faq-401',
    question: 'How do I update my personal information?',
    answer:
      'To update your personal information, go to the "Account Settings" or "Profile" section of your patient portal. From there, you can edit your contact information, address, insurance details, and communication preferences.',
    category: 'account'
  },
  {
    id: 'faq-402',
    question: 'How do I change my password?',
    answer:
      'To change your password, go to "Account Settings," select "Security," and click on "Change Password." You\'ll need to enter your current password and then create a new one.',
    category: 'account'
  },
  {
    id: 'faq-403',
    question: 'How do I enable two-factor authentication?',
    answer:
      'To enable two-factor authentication, go to "Account Settings," select "Security," and find the "Two-Factor Authentication" option. Follow the instructions to set up this additional layer of security for your account.',
    category: 'account',
    isPopular: true
  },
  {
    id: 'faq-404',
    question: 'How can I grant someone else access to my health information?',
    answer:
      'To grant proxy access to another person, go to "Account Settings" and select "Proxy Access." Follow the instructions to add a family member, caregiver, or other authorized individual. You can specify what level of access they have to your information.',
    category: 'account'
  },
  {
    id: 'faq-405',
    question: 'How do I set my communication preferences?',
    answer:
      'To set your communication preferences, go to "Account Settings" and select "Communication Preferences." From there, you can choose how you want to receive notifications about appointments, test results, messages, and other updates.',
    category: 'account'
  }
];

export const getPopularFAQs = (): FAQ[] => {
  return faqData.filter((faq) => faq.isPopular);
};

// Utility function to get FAQs by category
export const getFAQsByCategory = (category: string): FAQ[] => {
  return faqData.filter((faq) => faq.category === category);
};

// Utility function to search FAQs
export const searchFAQs = (query: string): FAQ[] => {
  const searchTerm = query.toLowerCase();
  return faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm) ||
      faq.answer.toLowerCase().includes(searchTerm)
  );
};
