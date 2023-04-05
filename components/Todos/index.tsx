import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { Badge, Card, Spinner, Table, TextInput } from 'flowbite-react';
import { HiOutlinePencilAlt, HiTrash } from 'react-icons/hi';

import { Database } from '@/types/database.types';
import DropDownTodoStatus from '../DropDownTodoStatus';
type Todos = Database['public']['Tables']['todos']['Row'];

const Todos = () => {
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    task: string;
  }>();

  const user = useUser();
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useQuery(
    'todos',
    async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user?.id)
        .order('id', { ascending: true });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      enabled: !!user, // Only run the query if user is defined
    },
  );

  const { mutate: mutationDelete } = useMutation(
    async (id: number) => {
      const { data, error } = await supabase
        .from('todos')
        .delete()
        .match({ id });
      if (error) {
        toast.error('Something went wrong');
        return error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success('Item Deleted successfully');
        return queryClient.refetchQueries('todos');
      },
    },
  );

  const { mutate: updateMutation } = useMutation(
    async (item: any) => {
      const { data, error } = await supabase
        .from('todos')
        .update({ task: item.task })
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

  const onItemClick = (todo: { id: number; task: string }) => {
    setSelectedItem(todo);
  };
  const onDeleteItemClick = async (id: number) => {
    await mutationDelete(id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('input[type="text"]')) {
        setSelectedItem(undefined);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <Card>
        <Spinner size="xl" />
      </Card>
    );
  }
  if (isLoading) {
    return (
      <Card>
        <Spinner size="xl" />
      </Card>
    );
  }
  return (
    <Table
      striped
      hoverable
      theme={{}}
      //   className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
    >
      <Table.Head className="bg-gray-50 dark:bg-gray-700">
        <Table.HeadCell>Zadanie</Table.HeadCell>
        <Table.HeadCell>Termin</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Akcje</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {isSuccess &&
          data!.map((todo: any) => (
            <Table.Row
              key={todo.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell
                className={`w-6/12 whitespace-nowrap font-medium text-gray-900 dark:text-white  ${
                  selectedItem?.id === todo.id ? 'input-cell' : 'py-4'
                }`}
                onClick={() => {
                  onItemClick(todo);
                }}
              >
                {selectedItem?.id === todo.id ? (
                  <TextInput
                    type="text"
                    autoFocus
                    value={selectedItem?.task}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem!,
                        task: e.target.value,
                      })
                    }
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        // Save changes to database
                        updateMutation(selectedItem);
                        setSelectedItem(undefined);
                      } else if (e.key === 'Escape') {
                        setSelectedItem(undefined);
                      }
                    }}
                  />
                ) : (
                  todo.task
                )}
              </Table.Cell>
              <Table.Cell className="w-3/12 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {new Date(todo.inserted_at).toLocaleString()}
              </Table.Cell>
              <Table.Cell className="w-2/12">
                <DropDownTodoStatus />
              </Table.Cell>
              <Table.Cell className="flex w-1/12 justify-center">
                <div>
                  <HiOutlinePencilAlt
                    cursor={'pointer'}
                    className="mr-2 h-6 w-6 text-blue-600"
                    onClick={() => onItemClick(todo)}
                  />
                </div>
                <div>
                  <HiTrash
                    cursor={'pointer'}
                    className="h-6 w-6 text-red-700 "
                    onClick={() => onDeleteItemClick(todo.id)}
                  />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};
export default Todos;
