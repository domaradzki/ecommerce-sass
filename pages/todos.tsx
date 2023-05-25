import Layout from 'src/app/components/Layout';
import { Toaster } from 'react-hot-toast';
import AddTodo from 'src/app/components/TodoList/AddTodo';
import Todos from 'src/app/components/TodoList/Todos';
import ProtectedWrapper from 'src/app/components/ProtectedWrapper';

export default function TodosPage() {
  return (
    <Layout>
      <ProtectedWrapper>
        <div className="px-4 pt-6">
          <div className="w-full rounded-lg p-6 shadow">
            <Todos />
            <AddTodo />
          </div>
        </div>
        <Toaster />
      </ProtectedWrapper>
    </Layout>
  );
}
