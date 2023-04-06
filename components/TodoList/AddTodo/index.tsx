import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { User } from '@supabase/supabase-js';
import { TextInput } from 'flowbite-react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

const AddTodo = () => {
  const [currentItem, setCurrentItem] = useState<string>('');
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const queryClient = useQueryClient();
  console.log('add', user);
  const { mutate: addTodoMutation } = useMutation(
    async (payload: { item: string; user: User }) => {
      const { data, error } = await supabaseClient.from('todos').insert([
        {
          task: payload.item,
          user_id: payload.user.id,
        },
      ]);
      if (error) {
        console.log('Error', error);
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success('Item Added successfully');
        setCurrentItem('');
        return queryClient.invalidateQueries('todos');
      },
    },
  );
  const handleAddItem = async (item: string) => {
    addTodoMutation({ item, user: user! });
  };
  return (
    <TextInput
      type={'text'}
      value={currentItem}
      placeholder="Enter item here"
      className="mt-1"
      onChange={(e) => setCurrentItem(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleAddItem(currentItem);
        }
      }}
    />
  );
};

export default AddTodo;
