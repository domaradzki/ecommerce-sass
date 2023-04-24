import Layout from '@/components/Layout';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import ProtectedWrapper from '@/components/ProtectedWrapper';
import ProductsTable from '@/components/Products/ProductsTable';
import SourceProducts from '@/components/Products/SourceProducts';

export default function ProductsPage() {
  return (
    <Layout>
      <ProtectedWrapper>
        <div className="px-4 pt-6">
          <div className="w-full rounded-lg p-6 shadow">
            <SourceProducts />
            <ProductsTable />
          </div>
        </div>
      </ProtectedWrapper>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
