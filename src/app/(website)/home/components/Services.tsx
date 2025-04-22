import Button from '@/atoms/Buttons';
import { Title } from '@/atoms/typographys';
import { Description } from '@headlessui/react';
import { describe } from 'node:test';
import { title } from 'process';

const tests = [
  {
    title: 'Complete blood count (CBC)',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur totam iste quasi nisi iure fugiat ipsum inventore id ut sunt temporibus amet ',
    price: 20
  },
  {
    title: 'Liver Function Test (LFT)',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur totam iste quasi nisi iure fugiat ipsum inventore id ut sunt temporibus amet ',
    price: 35
  },
  {
    title: 'Lipid Profile',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur totam iste quasi nisi iure fugiat ipsum inventore id ut sunt temporibus amet',
    price: 30
  },
  {
    title: 'Thyroid Panel (T3, T4, TSH)',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur totam iste quasi nisi iure fugiat ipsum inventore id ut sunt temporibus amet',
    price: 25
  }
];

const packageTest = [
  {
    title: 'Basic Health Screening',
    description:
      'loremte libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl',
    price: 1200,
    subtests: [
      {
        title: 'Basic Health screen',
        Description:
          'te libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl'
      },
      {
        title: 'Basic Health screen',
        Description:
          'te libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl'
      }
    ]
  },
  {
    title: 'Basic Health Screening',
    description:
      'loremte libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl',
    price: 1200,
    subtests: [
      {
        title: 'Basic Health screen',
        Description:
          'te libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl'
      },
      {
        title: 'Basic Health screen',
        Description:
          'te libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl'
      }
    ]
  }
];

const Services = () => {
  return (
    <div className="space-y-8 px-4 py-10">
      <div className="mx-auto max-w-7xl ">
        <Title text="Our Services" className="text-center font-semibold text-blue-400" />
        <p className="">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum
          lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac,
          vestibulum eu nisl.
        </p>
        <div className="mt-4 flex  flex-wrap justify-between gap-5">
          {tests.map((test, idx) => (
            <div className="flex w-[450px] flex-col space-y-2" key={idx}>
              <p className="ml-auto w-fit rounded-lg bg-red-300 px-5 py-1.5 text-white">
                ₦{test.price}
              </p>

              <p className="text-xl font-medium">{test.title}</p>
              <p>{test.description}</p>
              <div className="flex !w-[calc(100%-200px)] space-x-3">
                <Button variant="filled">Add to cart</Button>
                <Button
                  variant="outlined"
                  className="border-none bg-green-400 text-white hover:bg-green-300/80"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="filled" className="mt-5 rounded-sm font-semibold">
          View all Individual Test
        </Button>
      </div>
      <div className="mx-auto max-w-7xl  ">
        <Title text="Special Packages" className="text-center font-semibold text-blue-400" />
        <p className="">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum
          lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac,
          vestibulum eu nisl.
        </p>
        <div className="mt-4  flex w-full flex-col  justify-between gap-5">
          {packageTest.map((test, idx) => (
            <div className={`flex w-full gap-5 ${idx % 2 ? 'flex-row-reverse ' : ''}`} key={idx}>
              <div className="flex flex-1 flex-col space-y-6">
                <div className="space-y-3 bg-blue-400 p-10 text-white">
                  <div className="flex items-center justify-between">
                    <p className="w-fit rounded-lg bg-neutral-100 px-5 py-1.5 font-semibold  text-blue-400 ">
                      About the test
                    </p>
                    <p className="w-fit rounded-lg bg-red-300 px-5 py-1.5 text-white ">
                      ₦{test.price}
                    </p>
                  </div>
                  <p className="text-xl font-medium">{test.title}</p>
                  <p>{test.description}</p>
                </div>
                <div className="flex !w-[calc(100%-200px)]  space-x-3 bg-white">
                  <Button variant="filled" className="rounded-sm">
                    Add to cart
                  </Button>
                  <Button
                    variant="outlined"
                    className="rounded-sm border-none bg-green-400 text-white hover:bg-green-300/80"
                  >
                    Request Test
                  </Button>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {test?.subtests?.map((singleTest, idxt) => (
                  <div className="space-y-2" key={idxt}>
                    <p className="font-semibold text-black">{singleTest.title}</p>
                    <div className="relative">
                      <div className="absolute -left-2 bottom-0 top-0 w-[4px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                      {singleTest.Description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button variant="filled" className="mt-5 rounded-sm font-semibold">
          View all Individual Test
        </Button>
      </div>
      <div className="mx-auto max-w-7xl  ">
        <Title text="Advanced Imaging" className="text-center font-semibold text-blue-400" />
        <p className="">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum
          lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac,
          vestibulum eu nisl.
        </p>
        <div className="mt-4  flex w-full flex-col  justify-between gap-5">
          {packageTest.slice(1, 2).map((test, idx) => (
            <div className={`flex w-full gap-5 ${idx % 2 ? 'flex-row-reverse ' : ''}`} key={idx}>
              <div className="flex flex-1 flex-col space-y-6">
                <div className="space-y-3 bg-blue-400 p-10 text-white">
                  <div className="flex items-center justify-between">
                    <p className="w-fit rounded-lg bg-neutral-100 px-5 py-1.5 font-semibold  text-blue-400 ">
                      About the test
                    </p>
                    <p className="w-fit rounded-lg bg-red-300 px-5 py-1.5 text-white ">
                      ₦{test.price}
                    </p>
                  </div>
                  <p className="text-xl font-medium">{test.title}</p>
                  <p>{test.description}</p>
                </div>
                <div className="flex !w-[calc(100%-200px)]  space-x-3 bg-white">
                  <Button variant="filled" className="rounded-sm">
                    Add to cart
                  </Button>
                  <Button
                    variant="outlined"
                    className="rounded-sm border-none bg-green-400 text-white hover:bg-green-300/80"
                  >
                    Request Test
                  </Button>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {test?.subtests?.map((singleTest, idxt) => (
                  <div className="space-y-2" key={idxt}>
                    <p className="font-semibold text-black">{singleTest.title}</p>
                    <div className="relative">
                      <div className="absolute -left-2 bottom-0 top-0 w-[4px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                      {singleTest.Description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl  ">
        <Title text="Molecular Diagnostics" className="text-center font-semibold text-blue-400" />
        <p className="">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum
          lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac,
          vestibulum eu nisl.
        </p>
        <div className="mt-4  flex w-full flex-col  justify-between gap-5">
          {packageTest.slice(1, 2).map((test, idx) => (
            <div className={`flex w-full gap-5 ${idx % 2 ? 'flex-row-reverse ' : ''}`} key={idx}>
              <div className="flex flex-1 flex-col space-y-6">
                <div className="space-y-3 bg-blue-400 p-10 text-white">
                  <div className="flex items-center justify-between">
                    <p className="w-fit rounded-lg bg-neutral-100 px-5 py-1.5 font-semibold  text-blue-400 ">
                      About the test
                    </p>
                    <p className="w-fit rounded-lg bg-red-300 px-5 py-1.5 text-white ">
                      ₦{test.price}
                    </p>
                  </div>
                  <p className="text-xl font-medium">{test.title}</p>
                  <p>{test.description}</p>
                </div>
                <div className="flex !w-[calc(100%-200px)]  space-x-3 bg-white">
                  <Button variant="filled" className="rounded-sm">
                    Add to cart
                  </Button>
                  <Button
                    variant="outlined"
                    className="rounded-sm border-none bg-green-400 text-white hover:bg-green-300/80"
                  >
                    Request Test
                  </Button>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {test?.subtests?.map((singleTest, idxt) => (
                  <div className="space-y-2" key={idxt}>
                    <p className="font-semibold text-black">{singleTest.title}</p>
                    <div className="relative">
                      <div className="absolute -left-2 bottom-0 top-0 w-[4px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                      {singleTest.Description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
