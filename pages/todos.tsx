import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';
import AddTodo from '@/components/AddTodo';
import Todos from '@/components/Todos';
import ProtectedWrapper from '@/components/ProtectedWrapper';

export default function TodosPage() {
  return (
    <Layout>
      <ProtectedWrapper>
        <div className="px-4 pt-6">
          <Todos />
          <AddTodo />
        </div>
        <Toaster />
      </ProtectedWrapper>
    </Layout>
  );
}
