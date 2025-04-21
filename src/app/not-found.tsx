'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Paragraph, Title } from '@/atoms/typographys';
import Button from '@/atoms/Buttons';

const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <main className="mx-auto h-[calc(100vh-56px)] w-full max-w-[500px]">
        <section className="flex h-full w-[90%] flex-col items-center justify-center space-y-8">
          <div className="mx-auto flex w-full max-w-[80%] flex-col items-center justify-center text-center">
            <Title className="font-medium lg:!text-4xl" text="Oops" />
            <Paragraph
              className="mx-auto mb-4 text-center text-neutral-500"
              text="The page you are seeking cannot be found."
            />

            <div className="w-full">
              <Button variant="filled" text="Go Home" onClick={() => router.back()} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFound;
