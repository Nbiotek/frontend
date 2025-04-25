import { SubTitle, Title } from '@/atoms/typographys';
import Image from 'next/image';

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
  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-8">
        <Title text="What's New" className="text-center text-blue-400" />
        <p className="text-center">
          Get Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, distinctio.
          Rerum aut corporis, in ab voluptatem harum{' '}
        </p>

        <div className="mt-7 flex space-x-6 ">
          <div className="flex-1 space-y-3">
            <SubTitle
              text="The Scalability Solution: Understanding Layer One vs. Layer Two Blockchains"
              className="font-semibold text-[#02234D]"
            />
            <p className="font-thin text-blue-400">20 sep 2023</p>
            <Image
              src="/blog.png"
              width={600}
              height={600}
              alt="Blog"
              className="w-full bg-cover "
            />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus exercitationem
              quaerat unde quis incidunt. Dolorem eos libero ratione at voluptas ipsa nobis et,
              error, temporibus, repellat accusantium architecto iusto nihil. Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. Repellendus exercitationem quaerat unde quis
              incidunt. Dolorem eos libero ratione at voluptas ipsa nobis et, error, temporibus,
              repellat accusantium architecto iusto nihil.
            </p>
          </div>
          <div className="flex-1 space-y-4">
            <SubTitle text="More News" className="font-semibold text-[#02234D]" />
            {blog.map((item, idx) => (
              <div className="flex space-x-4" key={idx}>
                <Image
                  src={item.image}
                  height={400}
                  width={200}
                  alt="blog image"
                  className="flex-1 bg-cover"
                />
                <div className="w-[300px]">
                  <p className="font-semibold text-[#02234D]">{item.title}</p>
                  <p className="text-[#090920]">{item.description}</p>
                  <p className="text-blue-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
