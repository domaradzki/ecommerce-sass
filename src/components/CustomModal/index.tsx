'use client';

import Modal from '@/components/shared/modal';
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
// import Image from 'next/image';

const CustomModal = ({
  children,
  showCustomModal,
  setShowCustomModal,
}: {
  showCustomModal: boolean;
  setShowCustomModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) => {
  return (
    <Modal showModal={showCustomModal} setShowModal={setShowCustomModal}>
      <div className="w-full overflow-hidden md:max-w-xl md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 bg-white px-2 py-3 pt-4 text-center md:px-16">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export function useCustomModal() {
  const [showCustomModal, setShowCustomModal] = useState(false);

  const CustomModalCallback = useCallback(
    ({ children }: { children: ReactNode }) => {
      return (
        <CustomModal
          showCustomModal={showCustomModal}
          setShowCustomModal={setShowCustomModal}
        >
          {children}
        </CustomModal>
      );
    },
    [showCustomModal, setShowCustomModal],
  );

  return useMemo(
    () => ({ setShowCustomModal, CustomModal: CustomModalCallback }),
    [setShowCustomModal, CustomModalCallback],
  );
}
