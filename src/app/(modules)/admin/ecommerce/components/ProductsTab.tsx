'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Plus, Search } from 'lucide-react';
import { useFetchProducts } from '@/hooks/admin/useFetchProducts';
import ProductCard from './ProductCard';
import ProductsLoader from './ProductsLoader';
import EmptyProducts from './EmptyProducts';
import Pagination from '@/atoms/pagination';
import { pagination as defaultPagination } from '@/constants/data';

const ProductsTab = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState<TPaginationResponse>(defaultPagination);

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const { data, isLoading } = useFetchProducts({
    search: search || undefined,
    page,
    limit
  });

  useEffect(() => {
    if (data?.pagination) {
      setPaginationMeta(data.pagination);
    }
  }, [data]);

  const products = data?.items ?? [];

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="text-gray-400 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            className="pl-9"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button
          className="w-fit bg-blue-400"
          onClick={() => toggleModals({ name: AppModals.ADMIN_CREATE_PRODUCT, open: true, id: '' })}
        >
          <Plus />
          Add Product
        </Button>
      </div>

      {isLoading && <ProductsLoader />}

      {!isLoading && (
        <>
          {products.length > 0 ? (
            <div className="flex flex-col space-y-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyProducts />
          )}

          <Pagination
            total={paginationMeta.total}
            totalPages={paginationMeta.totalPages}
            currentPage={page}
            setPage={setPage}
            limit={limit}
            setLimit={(l) => {
              setLimit(l);
              setPage(1);
            }}
            siblingCount={1}
          />
        </>
      )}
    </div>
  );
};

export default ProductsTab;
