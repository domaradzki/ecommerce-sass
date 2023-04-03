import { Dropdown } from 'flowbite-react';
import { Badge } from 'flowbite-react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/types/database.types';

export default function DropDownTodoStatus() {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient<Database>();

  const { mutate } = useMutation(
    async (item: any) => {
      const { data, error } = await supabase
        .from('todos')
        .update({ status: item.status })
        .match({ id: item.id });
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
      label={<Badge color="purple">To do</Badge>}
    >
      <ul className="pb- pt-1" role="none">
        <li className="py-2 px-2">
          <Badge color="purple">To do</Badge>
        </li>
        <li className="py-2 px-2">
          <Badge color="yellow">In progress</Badge>
        </li>
        <li className="py-2 px-2">
          <Badge color="green">Done</Badge>
        </li>
        <li className="py-2 px-2">
          <Badge color="red">Won&apos;t do</Badge>
        </li>
      </ul>
    </Dropdown>
  );
}
