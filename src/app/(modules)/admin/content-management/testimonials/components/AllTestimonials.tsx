import EmptyTestimonial from './EmptyTestimonial';
import TestimonialLoader from './TestimonialLoader';
import TestimonialCard from './TestimonialCard';

interface ITestimonialContentProps {
  data: TAdminTestimonialResp | undefined;
  isLoading: boolean;
}
const AllTestimonial = ({ isLoading, data }: ITestimonialContentProps) => {
  return (
    <div className="w-full">
      {isLoading && <TestimonialLoader />}

      {data && (
        <div className="flex flex-col space-y-6">
          {data.testimonials.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {data.testimonials.map((el) => (
                <TestimonialCard key={el.id} testimonial={el} />
              ))}
            </div>
          ) : (
            <EmptyTestimonial />
          )}
        </div>
      )}
    </div>
  );
};

export default AllTestimonial;
