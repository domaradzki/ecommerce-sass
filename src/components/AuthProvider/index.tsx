'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import supabase from '@/utils/supabase-browser';
import { Database } from '@/types/database.types';
import { useQuery } from 'react-query';
type Profiles = Database['public']['Tables']['profiles']['Row'];

export const EVENTS = {
  PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
  SIGNED_OUT: 'SIGNED_OUT',
  USER_UPDATED: 'USER_UPDATED',
};

export const VIEWS = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
};

interface AuthContextProps {
  initial: boolean;
  session: any;
  user: any;
  view: string;
  userDetails: Profiles | null;
  setView: React.Dispatch<React.SetStateAction<string>>;
  signOut: () => void;
}

interface AuthProviderProps {
  accessToken: string | null;
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [initial, setInitial] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<string>(VIEWS.SIGN_IN);
  const [userDetails, setUserDetails] = useState<Profiles | null>(null);
  const router = useRouter();
  const { accessToken, ...rest } = props;

  const getUserDetails = () =>
    supabase.from('profiles').select('*').eq('id', user?.id).single();

  const { data, isLoading } = useQuery(
    ['userDetails', user?.id],
    async () => getUserDetails(),
    {
      enabled: !!user,
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (user && !userDetails && !isLoading) {
      setUserDetails(data?.data as Profiles);
    } else if (!user) {
      setUserDetails(null);
    }
  }, [user, isLoading]);

  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession();
      setSession(activeSession);
      setUser(activeSession?.user ?? null);
      setInitial(false);
    }
    getActiveSession();
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(
      (event: string, currentSession: any) => {
        if (currentSession?.access_token !== accessToken) {
          router.refresh();
        }

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        switch (event) {
          case EVENTS.PASSWORD_RECOVERY:
            setView(VIEWS.UPDATE_PASSWORD);
            break;
          case EVENTS.SIGNED_OUT:
          case EVENTS.USER_UPDATED:
            setView(VIEWS.SIGN_IN);
            break;
          default:
        }
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      view,
      userDetails,
      setView,
      signOut: () => supabase.auth.signOut(),
    };
  }, [initial, session, userDetails, user, view]);

  return <AuthContext.Provider value={value} {...rest} />;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
