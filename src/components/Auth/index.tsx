'use client';

import { useAuth, VIEWS } from '@/components/AuthProvider';

import ResetPassword from './ResetPassword';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UpdatePassword from './UpdatePassword';

interface AuthProps {
  view: string;
}

const Auth: React.FC<AuthProps> = ({ view: initialView }) => {
  const { view } = useAuth();

  let selectedView = initialView || view;

  switch (selectedView) {
    case VIEWS.UPDATE_PASSWORD:
      return <UpdatePassword />;
    case VIEWS.FORGOTTEN_PASSWORD:
      return <ResetPassword />;
    case VIEWS.SIGN_UP:
      return <SignUp />;
    default:
      return <SignIn />;
  }
};

export default Auth;
