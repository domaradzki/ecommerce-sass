import { Dropdown } from 'flowbite-react';
import { Badge } from 'flowbite-react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/types/database.types';
type Todos = Database['public']['Tables']['todos']['Row'];

export default function DropDownTodoStatus({ todo }) {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient<Database>();

  const { mutate } = useMutation(
    async (item: string) => {
      const { data, error } = await supabase
        .from('todos')
        .update({ status: item })
        .match({ id: todo.id });
      if (error) {
        toast.error('Something went wrong');
        return error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success('Item Updated successfully');
        return queryClient.refetchQueries('todos');
      },
    },
  );

  const colors = {
    'To do': 'blue',
    Done: 'success',
    'In progress': 'warning',
    'Wont done': 'failure',
  };

  return (
    <Dropdown
      arrowIcon={false}
      color="transparent"
      fullSized={false}
      outline={false}
      pill={false}
      placement="bottom"
      positionInGroup="middle"
      title="Dropdown profile"
      trigger="click"
      label={<Badge color={colors[todo.status]}>{todo.status}</Badge>}
    >
      <>
        <Dropdown.Item
          className="mb-1 flex justify-center bg-blue-300 text-center font-medium text-blue-700"
          onClick={function noRefCheck() {
            mutate('To do');
          }}
        >
          To do
        </Dropdown.Item>
        <Dropdown.Item
          className="mb-1 flex justify-center bg-yellow-300 text-center font-medium text-yellow-700"
          onClick={function noRefCheck() {
            mutate('In progress');
          }}
        >
          In progress
        </Dropdown.Item>
        <Dropdown.Item
          className="mb-1 flex justify-center bg-green-300 text-center font-medium text-green-700"
          onClick={function noRefCheck() {
            mutate('Done');
          }}
        >
          Done
        </Dropdown.Item>
        <Dropdown.Item
          className="flex justify-center bg-red-300 text-center font-medium text-red-700"
          onClick={function noRefCheck() {
            mutate('Wont done');
          }}
        >
          Won&apos;t do
        </Dropdown.Item>
      </>
    </Dropdown>
  );
}
