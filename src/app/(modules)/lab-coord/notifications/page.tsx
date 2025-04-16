import React from 'react';
import NotificationsView from './NotificationsView';
import { Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.LAB_COORD_NOTIFICATIONS;

export const metadata: Metadata = {
  title,
  description
};

const NotificationsPage = () => {
  return <NotificationsView />;
};

export default NotificationsPage;
