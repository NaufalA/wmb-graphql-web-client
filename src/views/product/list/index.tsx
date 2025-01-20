import React from 'react';
import { useQueryLoader } from 'react-relay';
import { productListQuery } from '../../../api/graphql/product';
import { ProductList } from './product-list';
import { productListQuery as productListQueryOperation } from '../../../api/graphql/__generated__/productListQuery.graphql';
import { Link } from 'react-router';

export function ProductListPage(): React.ReactNode {
  const batchSize = 10;
  const [queryRef, loadQuery] = useQueryLoader<productListQueryOperation>(
    productListQuery,
  );

  React.useEffect(() => {
    loadQuery({}, { fetchPolicy: 'network-only' });
  }, [loadQuery]);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex gap-2">
        <Link to="create" className="btn btn-success">
          Create Product
        </Link>
        <button
          type="button"
          onClick={() => {}}
          className="btn btn-secondary"
        >
          Refresh
        </button>
      </div>
      {queryRef ? (
        <ProductList
          batchSize={batchSize}
          queryRef={queryRef}
        />
      ) : (<h1>Loading...</h1>)}
    </div>
  );
}
