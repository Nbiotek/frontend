import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestContents from './components/TestContents';
import ProductListings from './components/ProductListings';
import Blog from './components/Blog';

const ContentManagementView = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="tests" className="flex w-full flex-col space-y-2">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="products">Products Listings</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full" value="tests">
            <TestContents />
          </TabsContent>
          <TabsContent className="w-full" value="products">
            <ProductListings />
          </TabsContent>
          <TabsContent className="w-full" value="blog">
            <Blog />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ContentManagementView;
