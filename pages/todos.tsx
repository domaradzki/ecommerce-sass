import Layout from '@/components/Layout';
import { useMutation, useQueryClient } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';
import AddTodo from '@/components/AddTodo';
import Todos from '@/components/Todos';

export default function TodosPage() {
  return (
    <Layout>
      <div className="px-4 pt-6">
        <AddTodo />
        <Todos />
      </div>
      <Toaster />
    </Layout>
  );
}
