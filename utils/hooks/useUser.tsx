import { useEffect, useState, createContext, useContext } from 'react';
import {
  useUser as useSupaUser,
  useSessionContext,
  User,
} from '@supabase/auth-helpers-react';
import { useQuery } from 'react-query';
import { Database } from '@/types/database.types';

type Profiles = Database['public']['Tables']['profiles']['Row'];

type UserContextType = {
  [x: string]: unknown;
  accessToken: string | null;
  user: User | null;
  userDetails: Profiles | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  // const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<Profiles | null>(null);

  const getUserDetails = () =>
    supabase.from('profiles').select('*').eq('id', user?.id).single();

  const { data, isLoading: isLoadingUserDetails } = useQuery(
    ['userDetails', user?.id],
    async () => getUserDetails(),
    {
      enabled: !!user,
      staleTime: Infinity,
    },
  );
  useEffect(() => {
    if (user && !userDetails && !isLoadingUserDetails) {
      setUserDetails(data?.data as Profiles);
    } else if (!user) {
      setUserDetails(null);
    }
  }, [user, isLoadingUserDetails]);

  const isLoading = isLoadingUser || isLoadingUserDetails;

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
