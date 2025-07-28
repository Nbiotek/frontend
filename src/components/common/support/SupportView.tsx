'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Contactus from './Contact';
import FAQ from './Faq';

const SupportView = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="faqs" className="flex w-full flex-col space-y-4">
        <div className=" w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-fit" value="faqs">
            <FAQ />
          </TabsContent>
          <TabsContent className="w-fit" value="contact">
            <Contactus />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SupportView;
