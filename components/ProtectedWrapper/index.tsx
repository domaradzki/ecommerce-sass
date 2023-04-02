import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/hooks/useUser';
import { Spinner } from 'flowbite-react';

type Props = {
  children: ReactNode;
};

export default function ProtectedWrapper({ children }: Props) {
  const router = useRouter();
  const { isLoading, isError, user } = useUser();
  console.log('protected', user);
  if (isLoading) {
    return (
      <div className="grid h-screen place-items-center">
        <Spinner aria-label="Default status example" />
      </div>
    );
  }

  if (isError) {
    router.push('/signin');
    return (
      <div className="grid h-screen place-items-center">
        <Spinner aria-label="Default status example" />
      </div>
    );
  }

  return <div>{children}</div>;
}
