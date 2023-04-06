import Modal from '@/components/shared/modal';
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import Image from 'next/image';

const CustomModal = ({
  showCustomModal,
  setShowCustomModal,
}: {
  showCustomModal: boolean;
  setShowCustomModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal showModal={showCustomModal} setShowModal={setShowCustomModal}>
      <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://precedent.dev">
            <Image
              src="/logo.png"
              alt="Precedent Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </a>
          <h3 className="font-display text-2xl font-bold">Precedent</h3>
          <p className="text-sm text-gray-500">
            Precedent is an opinionated collection of components, hooks, and
            utilities for your Next.js project.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export function useCustomModal() {
  const [showCustomModal, setShowCustomModal] = useState(false);

  const CustomModalCallback = useCallback(() => {
    return (
      <CustomModal
        showCustomModal={showCustomModal}
        setShowCustomModal={setShowCustomModal}
      />
    );
  }, [showCustomModal, setShowCustomModal]);

  return useMemo(
    () => ({ setShowCustomModal, CustomModal: CustomModalCallback }),
    [setShowCustomModal, CustomModalCallback],
  );
}
