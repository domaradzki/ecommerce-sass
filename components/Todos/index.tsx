import { useState } from 'react';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import {
  Spinner,
  Stack,
  ListItem,
  ListGroup,
  ListIcon,
  HStack,
  VStack,
  Flex,
  Text,
  Table,
} from 'flowbite-react';
import { HiOutlinePencilAlt, HiTrash } from 'react-icons/hi';

import toast from 'react-hot-toast';
const Todos = () => {
  const supabaseClient = useSupabaseClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    name: string;
  }>();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isSuccess } = useQuery(
    'todos',
    async () => {
      const { data, error } = await supabaseClient
        .from('todos')
        .select()
        .order('id', { ascending: true });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  );
  if (isLoading) {
    return (
      <Stack>
        <Spinner size="xl" />
      </Stack>
    );
  }
  return (
    <>
      <Table>
        <Table.Body className="divide-y">
          {data!.map((todo: any) => (
            <Table.Row
              key={todo.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {todo.name}
              </Table.Cell>
              <Table.Cell>
                <HiTrash
                  cursor={'pointer'}
                  color="red.500"
                  //   mr="2"
                  onClick={() => {}}
                />
                <HiOutlinePencilAlt cursor={'pointer'} onClick={() => {}} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
export default Todos;
