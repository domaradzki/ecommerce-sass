import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import {
  Card,
  Spinner,
  //   Stack,
  //   ListItem,
  //   ListGroup,
  //   ListIcon,
  //   HStack,
  //   VStack,
  //   Flex,
  //   Text,
  Table,
} from 'flowbite-react';
import { HiOutlinePencilAlt, HiTrash } from 'react-icons/hi';
import { useUser } from '@/utils/hooks/useUser';
import { Database } from '@/types/database.types';
type Todos = Database['public']['Tables']['todos']['Row'];

import toast from 'react-hot-toast';
const Todos = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    task: string;
  }>();
  const queryClient = useQueryClient();
  const user = useUser();
  const { isLoading } = user;
  const supabase = useSupabaseClient<Database>();
  const [todos, setTodos] = useState<Todos[] | null>(null);
  console.log('todos', todos);

  
  useEffect(() => {
    if (user.userTodos) {
      setTodos(user.userTodos);
    }
  }, [user, supabase]);
  //   const supabaseClient = useSupabaseClient();
  //   const [isOpen, setIsOpen] = useState<boolean>(false);
  //   const [selectedItem, setSelectedItem] = useState<{
  //     id: number;
  //     name: string;
  //   }>();
  //   const queryClient = useQueryClient();
  //   const { data, isLoading, isError, isSuccess } = useQuery(
  //     'todos',
  //     async () => {
  //       const { data, error } = await supabaseClient
  //         .from('todos')
  //         .select()
  //         .order('id', { ascending: true });
  //       if (error) {
  //         throw new Error(error.message);
  //       }
  //       return data;
  //     },
  //   );
  if (isLoading && !todos) {
    return (
      <Card>
        <Spinner size="xl" />
      </Card>
    );
  }
  return (
    <>
      <Table>
        <Table.Body className="divide-y">
          {todos &&
            todos!.map((todo: any) => (
              <Table.Row
                key={todo.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {todo.task}
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
