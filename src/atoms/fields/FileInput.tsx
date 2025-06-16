import { InputHTMLAttributes, forwardRef } from 'react';
import { MAX_IMAGE_UPLOAD_SIZE, MAX_VIDEO_UPLOAD_SIZE, MAX_PDF_UPLOAD_SIZE } from '@/constants';
import { fileSizeConverter } from '@/utils';
import { UploadCloud } from 'lucide-react';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string;
  handlerFn?: (_files: Array<File>) => void;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, name, errors, handlerFn, ...rest }, ref) => {
    const handleUpdates = (files: FileList | null) => {
      if (files && handlerFn) {
        const _files = Array.from(files);
        handlerFn(_files);
      }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      handleUpdates(files);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      handleUpdates(files);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    return (
      <div onDrop={handleDrop} onDragOver={handleDragOver} className="h-full w-full">
        <label
          htmlFor="file-input"
          className="data-[error=true]:border-error flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-borderLine bg-bgGray shadow-sm transition-shadow duration-300 ease-in-out hover:shadow data-[error=true]:border"
          data-error={!!errors}
        >
          <div className="flex w-full cursor-pointer flex-col items-center justify-center space-y-2 py-4">
            <UploadCloud />
            <p className="text-grey-500 w-full text-center text-sm md:w-full">
              Drop files or <span className="font-medium">Browse</span>
            </p>
            <div className="flex w-full flex-col items-center justify-center">
              <p className="text-gray-500 text-[10px]">
                PNG, JPG or GIF {`(MAX. ${fileSizeConverter(MAX_IMAGE_UPLOAD_SIZE)})`}
              </p>
              <p className="text-gray-500 text-[10px]">
                MP4 or MKV {`(MAX. ${fileSizeConverter(MAX_VIDEO_UPLOAD_SIZE)})`}
              </p>
              <p className="text-gray-500 text-[10px]">
                Pdf {`(MAX. ${fileSizeConverter(MAX_PDF_UPLOAD_SIZE)})`}
              </p>
            </div>
          </div>
        </label>
        {errors && <p className="text-error mt-1 text-xs">{errors}</p>}
        <Input
          ref={ref}
          id="file-input"
          type="file"
          {...rest}
          onChange={handleOnChange}
          className="hidden"
        />
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export default FileInput;
