import React from 'react';
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay';
import { Link } from 'react-router';
import {
  productListQuery,
  productPaginationFragment,
} from '../api/graphql/product';
import { productListQuery as productListQueryOperation } from '../api/graphql/__generated__/productListQuery.graphql';
import { productPaginationFragment$key } from '../api/graphql/__generated__/productPaginationFragment.graphql';
import { productPaginationQuery } from '../api/graphql/__generated__/productPaginationQuery.graphql';
import { ProductItem } from './product/list/product-item';
import { InputGroup, Button, Form } from 'react-bootstrap';

type ProductListProps = {
  queryRef: PreloadedQuery<productListQueryOperation>;
  batchSize: number;
};
export function ProductList({
  queryRef,
  batchSize,
}: ProductListProps): React.ReactNode {
  const product = usePreloadedQuery<productListQueryOperation>(
    productListQuery,
    queryRef
  );
  const [isPending, startTransition] = React.useTransition();
  const { data, loadNext } = usePaginationFragment<
    productPaginationQuery,
    productPaginationFragment$key
  >(productPaginationFragment, product);
  const onLoadMore = React.useCallback(
    () =>
      startTransition(() => {
        loadNext(batchSize);
      }),
    [batchSize, loadNext]
  );
  return (
    <>
      {data?.listProducts?.edges?.map((e) => (
        <ProductItem
          key={e?.cursor}
          product={e?.node}
          element={(data) => (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{data?.productName}</h5>
                <p className="card-text">{data?.price}</p>
                <p className="card-text">{`${data?.stock} ${data?.stockUnit}`}</p>
                <Link to={`products/${data?.id}`} className="btn btn-primary">
                  Detail
                </Link>
              </div>
            </div>
          )}
        />
      ))}
      {data?.listProducts.pageInfo.hasNextPage && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isPending}
          className="btn text-primary"
        >
          Load More
        </button>
      )}
    </>
  );
}

export function HomePage(): React.ReactNode {
  const batchSize = 10;
  const [queryRef, loadQuery] =
    useQueryLoader<productListQueryOperation>(productListQuery);

  const [isPending, startTransition] = React.useTransition();
  React.useEffect(() => {
    startTransition(() => {
      loadQuery({}, { fetchPolicy: 'store-or-network' });
    });
  }, [loadQuery]);

  const [search, setSearch] = React.useState('');

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex gap-2">
        <button
          type="button"
          onClick={() => {
            startTransition(() => {
              loadQuery({}, { fetchPolicy: 'network-only' });
            });
          }}
          className="btn btn-secondary"
        >
          Refresh
        </button>
        <InputGroup>
          <Form.Control
            placeholder="Search Text"
            aria-label="Search"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="outline-primary"
            onClick={() => {
              startTransition(() => {
                loadQuery({ search }, { fetchPolicy: 'store-or-network' });
              });
            }}
          >
            Search
          </Button>
        </InputGroup>
      </div>
      <div className="d-flex flex-column gap-4 mb-4">
        {queryRef && !isPending ? (
          <ProductList batchSize={batchSize} queryRef={queryRef} />
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}
