import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { StarIcon } from 'lucide-react';
import { forwardRef, InputHTMLAttributes, useState } from 'react';

interface IInputRatingProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const InputRating = forwardRef<HTMLInputElement, IInputRatingProps>(
  ({ label, description, value, onChange, ...props }, ref) => {
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);

    const handleStarClick = (starNumber: number) => {
      if (onChange) {
        const event = {
          target: {
            value: starNumber.toString(),
            name: props.name
          }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const getStarFillClass = (starNumber: number) => {
      const currentValue = parseInt(value?.toString() || '0');
      const displayValue = hoveredStar !== null ? hoveredStar : currentValue;

      if (starNumber <= displayValue) {
        return 'fill-yellow-400 text-yellow-400';
      }
      return 'fill-neutral-300 text-neutral-300';
    };

    return (
      <FormItem className="w-full">
        <FormLabel>
          {label}
          {props.required && label !== '' && <span className="text-red-300">*</span>}
        </FormLabel>
        <FormControl>
          <div role="radiogroup" aria-label="Rating" className="flex items-center gap-1">
            <input ref={ref} type="hidden" name={props.name} value={value?.toString() || ''} />
            {[1, 2, 3, 4, 5].map((starNumber) => (
              <div key={starNumber} className="flex items-center">
                <button
                  type="button"
                  className="cursor-pointer transition-transform hover:scale-110"
                  title={`${starNumber} star${starNumber !== 1 ? 's' : ''}`}
                  onMouseEnter={() => setHoveredStar(starNumber)}
                  onMouseLeave={() => setHoveredStar(null)}
                  onClick={() => handleStarClick(starNumber)}
                  aria-label={`Rate ${starNumber} star${starNumber !== 1 ? 's' : ''}`}
                >
                  <StarIcon
                    className={`h-6 w-6 transition-colors ${getStarFillClass(starNumber)}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </FormControl>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    );
  }
);

InputRating.displayName = 'InputRating';
export default InputRating;
