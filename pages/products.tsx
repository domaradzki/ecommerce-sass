import Layout from 'src/app/components/Layout';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import ProtectedWrapper from 'src/app/components/ProtectedWrapper';
import ProductsTable from 'src/app/components/Products/ProductsTable';
import SourceProducts from 'src/app/components/Products/SourceProducts';
import { parseStringPromise } from 'xml2js';

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

// export async function getServerSideProps() {
//   const res = await fetch(
//     'https://api.ikonka.com.pl/api2/index.php/request/?format=xml&hash=4b30b263734ce71f3fa5c5042440c160b015e10e&variant=b&lang=pl&currency=PLN',
//     // 'https://www.gimmik.net/?id=sklep&mode=userpanel&act=data_export&ext=dl&r=1&s=55&hydk=AEGMPPQ0VNZ1',
//   );
//   const items = await res.text();
//   const jsonData = await parseStringPromise(items, {
//     explicitArray: false,
//   });
//   return {
//     props: { jsonData },
//   };
// }
