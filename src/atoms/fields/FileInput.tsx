import { ChangeEventHandler, InputHTMLAttributes, forwardRef } from 'react';
import { MAX_IMAGE_UPLOAD_SIZE, MAX_VIDEO_UPLOAD_SIZE, MAX_PDF_UPLOAD_SIZE } from '@/constants';
import { fileSizeConverter } from '@/utils';
import { UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string;
  muliple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ name, errors, muliple, onChange, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            files: Array.from(files)
          }
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        onChange?.(syntheticEvent);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();

      const files = e.dataTransfer.files;

      const inputEvent = {
        ...e,
        target: {
          ...e.target,
          files: Array.from(files)
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange?.(inputEvent);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    return (
      <FormItem onDrop={handleDrop} onDragOver={handleDragOver} className="h-full w-full">
        <FormLabel
          htmlFor="file-input"
          className="data-[error=true]:border-error flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-borderLine bg-bgGray shadow-sm transition-shadow duration-300 ease-in-out hover:shadow data-[error=true]:border"
          data-error={!!errors}
          aria-label="File upload area. Drop files or browse."
        >
          <div className="flex w-full cursor-pointer flex-col items-center justify-center space-y-2 py-4">
            <UploadCloud />
            <p className="text-grey-500 w-full text-center text-sm md:w-full">
              Drop files or <span className="font-medium">Browse</span>
            </p>
            <div className="flex w-full flex-col items-center justify-center space-y-4">
              <div className="flex w-full flex-col items-center justify-center">
                <p className="text-gray-500 text-[10px]">
                  PNG, JPG or GIF {`(MAX. ${fileSizeConverter(MAX_IMAGE_UPLOAD_SIZE)})`}
                </p>
                <p className="text-gray-500 text-[10px]">
                  MP4 or MKV {`(MAX. ${fileSizeConverter(MAX_VIDEO_UPLOAD_SIZE)})`}
                </p>
              </div>
              <FormMessage>{errors}</FormMessage>
            </div>
          </div>
        </FormLabel>
        <FormControl>
          <Input
            ref={ref}
            id="file-input"
            type="file"
            {...rest}
            onChange={handleChange}
            className="hidden"
          />
        </FormControl>
      </FormItem>
    );
  }
);

FileInput.displayName = 'FileInput';

export default FileInput;
