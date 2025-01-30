import { forwardRef, InputHTMLAttributes, JSX } from 'react';

interface IInputCheckProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  note?: string;
  showInput?: boolean;
}

/**
 *
 * @param text
 * this function helps to extract strings with their respective link when
 * they are written following a particular pattern.
 * An example of the pattern is:
 * "I accept all :terms & conditions - https://google.com; and :privacy policy - https://giyf.com;"
 * @returns
 * output will be I accept all terms & conditions and privacy policy.
 */
const extractLink = (text: string): (string | JSX.Element)[] => {
  const regex = /:(.*?)-\s*(\S*?);/g;

  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;

  text.replace(regex, (match, label, url, offset) => {
    if (offset > lastIndex) {
      parts.push(text.slice(lastIndex, offset));
    }

    parts.push(
      <a
        key={url.trim()}
        href={url.trim()}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sushi text-blue-400 hover:underline"
      >
        {label.trim()}
      </a>
    );

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const InputCheck = forwardRef<HTMLInputElement, IInputCheckProps>(
  ({ label, error, note, showInput, ...props }, ref) => {
    return (
      <div className="text-sm text-neutral-500">
        <div className={`relative flex ${note ? 'items-start' : 'items-center'}`}>
          <div className="mt-[0.75px] flex h-5 items-center">
            <input
              ref={ref}
              id="hs-checkbox-delete"
              name="hs-checkbox-delete"
              type="checkbox"
              className={`accent-sushi focus:ring-sushi rounded border-borderLine text-black disabled:pointer-events-none disabled:opacity-50 ${showInput ? '' : 'hidden'}`}
              aria-describedby="hs-checkbox-delete-description"
              {...props}
            />
          </div>
          <label htmlFor="hs-checkbox-delete" className="ms-2 text-center">
            <span className="block">{extractLink(label)}</span>
            <span id="hs-checkbox-delete-description" className="block">
              {note}
            </span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          {error ? (
            <small className="text-error mt-1 transition-all duration-300">{error}</small>
          ) : (
            <div className="invisible">error</div>
          )}
        </div>
      </div>
    );
  }
);

InputCheck.displayName = 'InputCheck';
export default InputCheck;
