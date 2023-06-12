import ProductsTable from '@/components/Products/ProductsTable';
import SourceProducts from '@/components/Products/SourceProducts';

export default function ProductsPage() {
  return (
    // <ProtectedWrapper>
    <div className="px-4 pt-6">
      <div className="w-full rounded-lg p-6 shadow">
        <SourceProducts />
        <ProductsTable />
      </div>
    </div>
  );
}
