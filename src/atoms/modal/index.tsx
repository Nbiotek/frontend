'use client';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { GoX } from 'react-icons/go';
import { SubTitle } from '../typographys';

interface IXModalProps {
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  bgClose?: boolean;
  showClose?: boolean;
  title?: string;
}

export const XModal = ({
  className,
  children,
  isOpen,
  closeModal,
  showClose = true,
  bgClose = true,
  title
}: IXModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative" onClose={() => (bgClose ? closeModal() : null)}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </TransitionChild>

        <div className="fixed inset-0 z-[999] overflow-y-auto bg-black/80 backdrop-blur-[5px]">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={`flex w-full max-w-[550px] transform flex-col items-center justify-center space-y-2 rounded-xl border bg-white p-4 text-left align-middle shadow-xl transition-all ${className}`}
              >
                {showClose && (
                  <div className="flex w-full items-center justify-between">
                    <SubTitle text={title ?? ''} />
                    <div
                      onClick={closeModal}
                      className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full bg-bgGray hover:bg-[#00000010]"
                    >
                      <GoX className="text-xl" />
                    </div>
                  </div>
                )}
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
