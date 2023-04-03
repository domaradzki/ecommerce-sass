import { useEffect, useRef, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { Badge, Card, Spinner, Table } from 'flowbite-react';
import { HiOutlinePencilAlt, HiTrash } from 'react-icons/hi';

// import EditTodosModal from '../EditTodosModal';

import { Database } from '@/types/database.types';
type Todos = Database['public']['Tables']['todos']['Row'];

const Todos = () => {
  const wrapperRef = useRef<HTMLTableElement>(null);
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    task: string;
  }>();
  const [editableCell, setEditableCell] = useState<{
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
        //  setCurrentItem('');
        //  onClose();
        return queryClient.refetchQueries('todos');
      },
    },
  );
  //   const handleUpdate = (id: number, task: string) => {
  //     updateMutation({ id: selectedItem?.id, task: item });
  //   };

  //   const handleUpdateModalClose = () => {
  //     setIsOpen(!isOpen);
  //   };
  //   const handleEditableCellClick = (id: number, task: string) => {
  //     setEditableCell({ id, task });
  //   };
  const onItemClick = (todo: { id: number; task: string }) => {
    setSelectedItem(todo);
  };
  const onDeleteItemClick = async (id: number) => {
    await mutationDelete(id);
  };

  const handleEditableCellBlur = async (id: number) => {
    setEditableCell(undefined);
    await supabase
      .from('todos')
      .update({ task: editableCell?.task })
      .match({ id });
    queryClient.invalidateQueries('todos');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      console.log(event);
      console.log(wrapperRef);

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSelectedItem(undefined);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

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
      <Table hoverable={true}>
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
                <Table.Cell
                  className="whitespace-nowrap py-2 font-medium text-gray-900 dark:text-white"
                  onClick={() => {
                    onItemClick(todo);
                    // setIsOpen(true);
                  }}
                  ref={wrapperRef.current}
                >
                  {selectedItem?.id === todo.id ? (
                    <input
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
      {/* <EditTodosModal
        todo={selectedItem!}
        isOpen={isOpen}
        onClose={handleUpdateModalClose}
      /> */}
    </>
  );
};
export default Todos;
