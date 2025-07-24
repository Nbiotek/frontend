'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { faqData, faqCategories, searchFAQs, getFAQsByCategory } from '@/config/Faq';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter FAQs based on search query and active category
  const filteredFAQs = searchQuery
    ? searchFAQs(searchQuery)
    : activeCategory === 'all'
      ? faqData
      : getFAQsByCategory(activeCategory);

  // Count FAQs by category for badges
  const getCategoryCount = (categoryId: string) => {
    return faqData.filter((faq) => faq.category === categoryId).length;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find answers to common questions about our services and your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for questions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6 flex w-full space-x-2 overflow-x-auto">
          <TabsTrigger value="all" className="flex-none">
            All FAQs
            <Badge variant="secondary" className="ml-2">
              {faqData.length}
            </Badge>
          </TabsTrigger>
          {faqCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex-none">
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {getCategoryCount(category.id)}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <FAQAccordion faqs={filteredFAQs} />
        </TabsContent>

        {faqCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
            </Card>
            <FAQAccordion faqs={filteredFAQs} />
          </TabsContent>
        ))}
      </Tabs>

      {filteredFAQs.length === 0 && (
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground">No FAQs found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const FAQAccordion = ({ faqs }: { faqs: FAQ[] }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-b">
          <AccordionTrigger className="text-left font-medium">
            <div className="flex items-start">
              <Badge variant="outline" className="mr-3 mt-0.5 flex-none">
                Q
              </Badge>
              <span>{faq.question}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-12">
            <div className="flex items-start pt-2">
              <Badge variant="secondary" className="mr-3 mt-0.5 flex-none">
                A
              </Badge>
              <div className="text-muted-foreground">{faq.answer}</div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQ;
