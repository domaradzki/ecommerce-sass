import { useEffect, useState, createContext, useContext } from 'react';
import {
  useUser as useSupaUser,
  useSessionContext,
  User,
} from '@supabase/auth-helpers-react';
import { Database } from '@/types/database.types';

type Profiles = Database['public']['Tables']['profiles']['Row'];
type Todos = Database['public']['Tables']['todos']['Row'];

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: Profiles | null;
  userTodos: Todos[] | null;
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
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<Profiles | null>(null);
  const [userTodos, setTodos] = useState<Todos[] | null>(null);

  const getUserDetails = () =>
    supabase.from('profiles').select('*').eq('id', user?.id).single();
    
  const getTodos = () =>
    supabase
      .from('todos')
      .select()
      .eq('user_id', user?.id)
      .order('id', { ascending: true });

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !userTodos) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails(), getTodos()]).then((results) => {
        const userDetailsPromise = results[0];
        const userTodosPromise = results[1];

        if (userDetailsPromise.status === 'fulfilled')
          setUserDetails(userDetailsPromise.value.data as Profiles);

        if (userTodosPromise.status === 'fulfilled')
          setTodos(userTodosPromise.value.data as Todos[]);

        setIsloadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setTodos(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    userTodos,
    isLoading: isLoadingUser || isLoadingData,
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
