'use client';

import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';
import AddTodo from '@/components/TodoList/AddTodo';
import Todos from '@/components/TodoList/Todos';
import ProtectedWrapper from '@/components/ProtectedWrapper';

export default function TodosPage() {
  return (
    <>
      <div className="px-4 pt-6">
        <div className="w-full rounded-lg p-6 shadow">
          <Todos />
          <AddTodo />
        </div>
      </div>
      <Toaster />
    </>
  );
}
