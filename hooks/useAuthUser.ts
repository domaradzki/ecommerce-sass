import { useQuery } from 'react-query';
import { useUser } from '@supabase/auth-helpers-react';
import supabase from '@/utils/supabase';

const getUser = async ({ userId }: { userId: string }) => {
  if (userId === '') return null;
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('User not found');
  }

  return data;
};

export default function useAuthUser() {
  const user = useUser();

  return useQuery('user', () => {
    getUser({ userId: user?.id ?? '' });
  });
}
