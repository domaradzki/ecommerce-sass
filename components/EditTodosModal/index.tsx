import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Modal, TextInput } from 'flowbite-react';
import toast from 'react-hot-toast';
import { Database } from '@/types/database.types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

//Internal dependencies
type Prop = {
  todo: {
    id: number;
    task: string;
  };
  isOpen: boolean;
  onClose: () => void;
};
const EditTodosModal = ({ todo, isOpen, onClose }: Prop) => {
  const [currentItem, setCurrentItem] = useState(todo?.task);
  const supabase = useSupabaseClient<Database>();

  useEffect(() => {
    if (todo) {
      setCurrentItem(todo.task);
    }
  }, [todo]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
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
        setCurrentItem('');
        onClose();
        return queryClient.refetchQueries('todos');
      },
    },
  );
  const handleUpdate = (item: string) => {
    mutate({ id: todo.id, task: item });
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
        <strong>Update Item</strong>
      </Modal.Header>
      <Modal.Body>
        <TextInput
          type={'text'}
          value={currentItem}
          placeholder="Enter item here"
          onChange={(e) => setCurrentItem(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleUpdate(currentItem);
            }
          }}
        />
      </Modal.Body>
    </Modal>
  );
};
export default EditTodosModal;
