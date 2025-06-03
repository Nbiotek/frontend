import { SubTitle, Title } from '@/atoms/typographys';
import Image from 'next/image';
import { format } from 'date-fns';

const blog = [
  {
    title: 'Revolutionizing Patient Care with ItOn Healthcare',
    description: 'Discover how ItOn Healthcare is transforming the patient .....',
    image: '/blog2.png',
    date: '2025-04-22'
  },
  {
    title: 'The Role of Data Security in ItOn Healthcare Systems',
    description: 'As digital health records become the norm, learn how ItOn ...',
    image: '/blog2.png',
    date: '2025-04-19'
  },
  {
    title: 'How ItOn Healthcare Empowers Rural Clinics',
    description: 'With cloud-based tools and mobile support, ItOn Healthcare is bridging the ...',
    image: '/blog2.png',
    date: '2025-04-15'
  }
];

const WhatsNew = () => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <section
      id="whats-new"
      className="flex flex-col justify-center px-4 py-20 sm:px-6 md:px-8 lg:min-h-screen"
      style={{
        paddingTop: 'calc(var(--header-height, 80px) + 2rem)',
        minHeight: 'calc(100vh - var(--header-height, 80px))'
      }}
    >
      <div className="mx-auto max-w-7xl py-8">
        <Title text="What's New" className="text-center text-blue-400" />
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm sm:text-base">
          Get Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, distinctio.
          Rerum aut corporis, in ab voluptatem harum{' '}
        </p>

        <div className="mt-7 flex flex-col space-y-8 lg:flex-row lg:space-x-6 lg:space-y-0">
          <div className="flex-1 space-y-3">
            <SubTitle
              text="The Scalability Solution: Understanding Layer One vs. Layer Two Blockchains"
              className="text-lg font-semibold text-[#02234D] sm:text-xl"
            />
            <p className="text-sm font-thin text-blue-400 sm:text-base">20 Sep 2023</p>
            <div className="relative h-[200px] w-full overflow-hidden border">
              <Image
                src="/blog.png"
                alt="Blog"
                width={630}
                height={340}
                className="transition-transform duration-300 hover:scale-105 "
              />
            </div>
            <p className="text-sm leading-relaxed sm:text-base">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus exercitationem
              quaerat unde quis incidunt. Dolorem eos libero ratione at voluptas ipsa nobis et,
              error, temporibus, repellat accusantium architecto iusto nihil. Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. R
            </p>
          </div>

          <div className="flex-1 space-y-4">
            <SubTitle
              text="More News"
              className="text-lg font-semibold text-[#02234D] sm:text-xl"
            />

            <div className="space-y-4">
              {blog.map((item, idx) => (
                <div
                  className="border-gray-100 flex flex-col space-y-3 overflow-hidden rounded-lg border shadow-sm sm:flex-row sm:space-x-4 sm:space-y-0"
                  key={idx}
                >
                  <div className="relative h-[180px] sm:h-auto sm:w-[120px] md:w-[180px]">
                    <Image
                      src={item.image}
                      width={200}
                      height={200}
                      alt={item.title}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-3">
                    <div>
                      <h3 className="line-clamp-2 text-base font-semibold text-[#02234D] sm:text-sm md:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-[#090920]">{item.description}</p>
                    </div>
                    <p className="mt-2 text-xs text-blue-400 sm:text-sm">{formatDate(item.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNew;
