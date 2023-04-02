import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { Badge, Card, Spinner, Table } from 'flowbite-react';
import { HiOutlinePencilAlt, HiTrash, HiCheck, HiX } from 'react-icons/hi';
// import { useUser } from '@/utils/hooks/useUser';
import { Database } from '@/types/database.types';
type Todos = Database['public']['Tables']['todos']['Row'];

import toast from 'react-hot-toast';
import EditTodosModal from '../EditTodosModal';
const Todos = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    task: string;
  }>();
  const queryClient = useQueryClient();
  // const { isLoading, subscription, userDetails } = useUser();
  const user = useUser();
  const supabase = useSupabaseClient<Database>();

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

  const { mutate } = useMutation(
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

  const handleUpdateModalClose = () => {
    setIsOpen(!isOpen);
  };
  const onItemClick = (todo: { id: number; task: string }) => {
    setSelectedItem(todo);
    setIsOpen(true);
  };
  const onDeleteItemClick = async (id: number) => {
    await mutate(id);
  };

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
    <>
      <Table striped={true}>
        <Table.Head>
          <Table.HeadCell>Zadanie</Table.HeadCell>
          <Table.HeadCell>Termin</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell className="flex justify-end">Akcje</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {isSuccess &&
            data!.map((todo: any) => (
              <Table.Row
                key={todo.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {todo.task}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {new Date(todo.inserted_at).toLocaleString()}
                </Table.Cell>
                <Table.Cell className="w-5">
                  {todo.is_complete ? (
                    <Badge color="success">Ukończone</Badge>
                  ) : (
                    <Badge color="purple">Nowe</Badge>
                  )}
                </Table.Cell>
                <Table.Cell className="flex justify-end">
                  <HiOutlinePencilAlt
                    cursor={'pointer'}
                    className="mr-2 h-6 w-6 text-blue-600"
                    onClick={() => onItemClick(todo)}
                  />
                  <HiTrash
                    cursor={'pointer'}
                    className="h-6 w-6 text-red-700 "
                    onClick={() => onDeleteItemClick(todo.id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <EditTodosModal
        todo={selectedItem!}
        isOpen={isOpen}
        onClose={handleUpdateModalClose}
      />
    </>
  );
};
export default Todos;
