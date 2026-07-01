import { Suspense } from 'react';
import ContentManagementView from './ContentManagementView';

const ContentManagementViewPage = () => {
  return (
    <Suspense>
      <ContentManagementView />
    </Suspense>
  );
};

export default ContentManagementViewPage;
