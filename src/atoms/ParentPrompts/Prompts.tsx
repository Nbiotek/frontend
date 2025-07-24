'use client';
import { GoX } from 'react-icons/go';
import { SubTitle } from '../typographys';

export const PromptsContainer = ({
  title,
  className,
  children,
  isOpen,
  closeModal,
  showClose = true
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  showClose?: boolean;
}) => {
  return (
    <>
      {isOpen ? (
        <div className="relative">
          <div
            className={`fixed bottom-0 z-[99] h-auto w-full transform flex-col items-center justify-center space-y-1 border-t border-borderLine bg-white px-2 py-4 text-left align-middle transition-all ${className}`}
          >
            <div className="mx-auto flex w-full max-w-[500px] flex-col space-y-4">
              <div className="flex justify-between">
                {title ? <SubTitle className="!m-0" text={title} /> : null}

                {showClose ? (
                  <div
                    onClick={closeModal}
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-bgGray hover:bg-[#00000010]"
                  >
                    <GoX className="text-xl" />
                  </div>
                ) : null}
              </div>

              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
