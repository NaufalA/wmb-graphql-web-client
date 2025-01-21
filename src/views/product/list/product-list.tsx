import React, { useTransition } from 'react';
import {
  PreloadedQuery,
  useMutation,
  usePaginationFragment,
  usePreloadedQuery,
} from 'react-relay';
import {
  productDeleteMutation,
  productListQuery,
  productPaginationFragment,
} from '../../../api/graphql/product';
import { ProductItem } from './product-item';
import { productDetailFragment$data } from '../../../api/graphql/__generated__/productDetailFragment.graphql';
import { Link } from 'react-router';
import { productListQuery as productListQueryOperation } from '../../../api/graphql/__generated__/productListQuery.graphql';
import { productPaginationQuery } from '../../../api/graphql/__generated__/productPaginationQuery.graphql';
import { productPaginationFragment$key } from '../../../api/graphql/__generated__/productPaginationFragment.graphql';
import { getField } from '../../util';

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
  const [isPending, startTransition] = useTransition();
  const { data, loadNext, refetch } = usePaginationFragment<
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

  const [commitDeleteMutation, isDeleteMutationInFlight] = useMutation(
    productDeleteMutation
  );

  const handleDelete = React.useCallback(
    (d: productDetailFragment$data | null | undefined) => {
      if (window.confirm(`delete product ${d?.productName}?`)) {
        commitDeleteMutation({
          variables: {
            id: d?.id,
          },
          onCompleted: () => {
            refetch(
              {},
              {
                fetchPolicy: 'network-only',
              }
            );
          },
          onError(error) {
            window.alert(error);
          },
        });
      }
    },
    [commitDeleteMutation, refetch]
  );

  const isLoading = React.useMemo(
    () => isDeleteMutationInFlight || isPending,
    [isDeleteMutationInFlight, isPending]
  );

  const tableHeader = React.useMemo(
    () => [
      {
        id: 'productName',
        label: 'Product Name',
      },
      {
        id: 'price',
        label: 'Price',
      },
      {
        id: 'stock',
        label: 'Stock',
        render: (d: productDetailFragment$data | null | undefined) =>
          `${d?.stock} ${d?.stockUnit}`,
      },
      {
        id: 'createTime',
        label: 'Created at',
        render: (d) =>
          d?.createTime ? new Date(d.createTime).toLocaleString() : '',
      },
      {
        id: 'updateTime',
        label: 'Last Updated',
        render: (d) =>
          d?.updateTime ? new Date(d.updateTime).toLocaleString() : '',
      },
      {
        id: 'action',
        label: 'Action',
        render: (d) => (
          <div className="d-flex gap-2">
            <Link
              to={d?.id as string}
              className="btn btn-primary"
              aria-disabled={isLoading}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(d)}
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [handleDelete, isLoading]
  );

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            {tableHeader.map((th) => (
              <th scope="col" key={`header-${th.id}`}>
                {th.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.listProducts.edges.map((e, i) => (
            <ProductItem
              key={e?.cursor}
              product={e?.node}
              element={(data) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  {tableHeader.map((th) => (
                    <td scope="col" key={`${e?.cursor}-${th.id}`}>
                      {th.render ? th.render(data) : getField(data, th.id)}
                    </td>
                  ))}
                </tr>
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
        </tbody>
      </table>
    </>
  );
}
