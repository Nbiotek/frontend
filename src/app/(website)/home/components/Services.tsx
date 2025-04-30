import Button from '@/atoms/Buttons';
import { Title } from '@/atoms/typographys';

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
    <div className="space-y-12 px-4 py-10 sm:px-6 md:px-8">
      {/* Individual Tests Section */}
      <div className="mx-auto max-w-7xl">
        <Title text="Our Services" className="text-center font-semibold text-blue-400" />
        <p className="mx-auto mt-3 text-sm sm:text-base">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum
          lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac,
          vestibulum eu nisl.
        </p>

        {/* Individual Tests - */}
        <div className="mt-4 flex flex-wrap justify-between gap-4 sm:gap-5" id="lab-test">
          {tests.map((test, idx) => (
            <div className="flex w-full flex-col space-y-2 md:w-[450px]" key={idx}>
              <p className="ml-auto w-fit rounded-lg bg-red-300 px-4 py-1.5 text-white">
                ₦{test.price}
              </p>

              <p className="text-lg font-medium sm:text-xl">{test.title}</p>
              <p className="text-sm sm:text-base">{test.description}</p>
              <div className="flex w-full space-x-3 sm:!w-[calc(100%-100px)] md:!w-[calc(100%-200px)]">
                <Button variant="filled" className="text-sm">
                  Add to cart
                </Button>
                <Button
                  variant="outlined"
                  className="border-none bg-green-400 text-sm text-white hover:bg-green-300/80"
                >
                  View details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8">
          <Button variant="filled" className="rounded-sm font-semibold">
            View all Individual Test
          </Button>
        </div>
      </div>

      {/* Special Packages Section */}
      <div className="mx-auto max-w-7xl" id="special-package">
        <Title text="Special Packages" className="text-center font-semibold text-blue-400" />
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm sm:text-base">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>

        <div className="mt-8 flex w-full flex-col gap-8">
          {packageTest.map((test, idx) => (
            <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-8" key={idx}>
              <div className="flex flex-1 flex-col space-y-4">
                <div className="space-y-3 rounded-lg bg-blue-400 p-4 text-white sm:p-6 md:p-8">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <p className="w-fit rounded-lg bg-neutral-100 px-3 py-1 text-sm font-semibold text-blue-400 sm:px-4 sm:py-1.5">
                      About the test
                    </p>
                    <p className="w-fit rounded-lg bg-red-300 px-3 py-1 text-sm text-white sm:px-4 sm:py-1.5">
                      ₦{test.price}
                    </p>
                  </div>
                  <p className="text-lg font-medium sm:text-xl">{test.title}</p>
                  <p className="text-sm sm:text-base">{test.description}</p>
                </div>
                <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Button variant="filled" className="rounded-sm text-sm">
                    Add to cart
                  </Button>
                  <Button
                    variant="outlined"
                    className="rounded-sm border-none bg-green-400 text-sm text-white hover:bg-green-300/80"
                  >
                    Request Test
                  </Button>
                </div>
              </div>

              <div className="border-gray-100 flex-1 space-y-4 rounded-lg border p-4 shadow-sm sm:p-6">
                <h3 className="font-semibold text-blue-400">Included Tests</h3>
                {test?.subtests?.map((singleTest, idxt) => (
                  <div className="space-y-2" key={idxt}>
                    <p className="font-semibold text-black">{singleTest.title}</p>
                    <div className="relative pl-4">
                      <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                      <p className="text-sm">{singleTest.Description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="filled" className="rounded-sm font-semibold">
            View all Package Tests
          </Button>
        </div>
      </div>

      {/* Advanced Imaging Section */}
      <div className="mx-auto max-w-7xl" id="advanced-imaging">
        <Title text="Advanced Imaging" className="text-center font-semibold text-blue-400" />
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm sm:text-base">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>

        <div className="mt-8 flex w-full flex-col gap-8">
          {packageTest.slice(1, 2).map((test, idx) => (
            <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-8" key={idx}>
              <div className="flex flex-1 flex-col space-y-4">
                <div className="space-y-3 rounded-lg bg-blue-400 p-4 text-white sm:p-6 md:p-8">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <p className="w-fit rounded-lg bg-neutral-100 px-3 py-1 text-sm font-semibold text-blue-400 sm:px-4 sm:py-1.5">
                      About the test
                    </p>
                    <p className="w-fit rounded-lg bg-red-300 px-3 py-1 text-sm text-white sm:px-4 sm:py-1.5">
                      ₦{test.price}
                    </p>
                  </div>
                  <p className="text-lg font-medium sm:text-xl">{test.title}</p>
                  <p className="text-sm sm:text-base">{test.description}</p>
                </div>
                <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Button variant="filled" className="rounded-sm text-sm">
                    Add to cart
                  </Button>
                  <Button
                    variant="outlined"
                    className="rounded-sm border-none bg-green-400 text-sm text-white hover:bg-green-300/80"
                  >
                    Request Test
                  </Button>
                </div>
              </div>

              <div className="border-gray-100 flex-1 space-y-4 rounded-lg border p-4 shadow-sm sm:p-6">
                <h3 className="font-semibold text-blue-400">Included Tests</h3>
                {test?.subtests?.map((singleTest, idxt) => (
                  <div className="space-y-2" key={idxt}>
                    <p className="font-semibold text-black">{singleTest.title}</p>
                    <div className="relative pl-4">
                      <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                      <p className="text-sm">{singleTest.Description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Molecular Diagnostics Section */}
      <div className="mx-auto max-w-7xl" id="molecular-diagnostics">
        <Title text="Molecular Diagnostics" className="text-center font-semibold text-blue-400" />
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm sm:text-base">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>

        <div className="mt-8 flex w-full flex-col gap-8">
          {packageTest.slice(1, 2).map((test, idx) => (
            <div className="flex w-full flex-col gap-6 lg:flex-row-reverse lg:gap-8" key={idx}>
              {/* Left side (now on right on desktop) */}
              <div className="flex flex-1 flex-col space-y-4">
                <div className="space-y-3 rounded-lg bg-blue-400 p-4 text-white sm:p-6 md:p-8">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <p className="w-fit rounded-lg bg-neutral-100 px-3 py-1 text-sm font-semibold text-blue-400 sm:px-4 sm:py-1.5">
                      About the test
                    </p>
                    <p className="w-fit rounded-lg bg-red-300 px-3 py-1 text-sm text-white sm:px-4 sm:py-1.5">
                      ₦{test.price}
                    </p>
                  </div>
                  <p className="text-lg font-medium sm:text-xl">{test.title}</p>
                  <p className="text-sm sm:text-base">{test.description}</p>
                </div>
                <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Button variant="filled" className="rounded-sm text-sm">
                    Add to cart
                  </Button>
                  <Button
                    variant="outlined"
                    className="rounded-sm border-none bg-green-400 text-sm text-white hover:bg-green-300/80"
                  >
                    Request Test
                  </Button>
                </div>
              </div>

              <div className="border-gray-100 flex-1 space-y-4 rounded-lg border p-4 shadow-sm sm:p-6">
                <h3 className="font-semibold text-blue-400">Included Tests</h3>
                {test?.subtests?.map((singleTest, idxt) => (
                  <div className="space-y-2" key={idxt}>
                    <p className="font-semibold text-black">{singleTest.title}</p>
                    <div className="relative pl-4">
                      <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                      <p className="text-sm">{singleTest.Description}</p>
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
