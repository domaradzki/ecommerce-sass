import Modal from '@/components/shared/modal';
import Logo from '@/components/icons/Logo';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import LoadingDots from '@/components/ui/LoadingDots';
// import { LoadingDots, Google } from '@/components/shared/icons';

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (!!user) {
      setShowSignInModal(false);
    }
  }, [user]);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      {!user ? (
        <div className="height-screen-helper flex justify-center rounded-xl bg-black p-8">
          <div className="m-auto flex w-80 max-w-lg flex-col justify-between p-3 ">
            <div className="flex justify-center pb-12">
              <Logo width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4">
              <Auth
                supabaseClient={supabaseClient}
                providers={['github']}
                redirectTo={'http://localhost:3000'}
                magicLink={true}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#404040',
                        brandAccent: '#52525b',
                      },
                    },
                  },
                }}
                theme="dark"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="m-6">
          <LoadingDots />
        </div>
      )}
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
