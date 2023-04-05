import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/hooks/useUser';
import { Spinner } from 'flowbite-react';

type Props = {
  children: ReactNode;
};

export default function ProtectedWrapper({ children }: Props) {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signin');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="grid h-screen place-items-center">
        <Spinner aria-label="Default status example" />
      </div>
    );
  }

  if (!isLoading && !user) {
    return (
      <div className="grid h-screen place-items-center">
        <Spinner aria-label="Default status example" />
      </div>
    );
  }

  return <div>{children}</div>;
}
