import React, { useTransition } from 'react';
import { useQueryLoader } from 'react-relay';
import { productListQuery } from '../../../api/graphql/product';
import { ProductList } from './product-list';
import { productListQuery as productListQueryOperation } from '../../../api/graphql/__generated__/productListQuery.graphql';
import { Link } from 'react-router';
import { Button, Form, InputGroup } from 'react-bootstrap';

export function ProductListPage(): React.ReactNode {
  const batchSize = 10;
  const [queryRef, loadQuery] = useQueryLoader<productListQueryOperation>(
    productListQuery,
  );

  const [isPending, startTransition] = useTransition();
  React.useEffect(() => {
    startTransition(() => {
      loadQuery({}, { fetchPolicy: 'store-or-network' });
    });
  }, [loadQuery]);

  const [search, setSearch] = React.useState('');

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex gap-2">
        <Link to="create" className="btn btn-success">
          Create Product
        </Link>
      </div>
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
      {queryRef && !isPending ? (
        <ProductList
          batchSize={batchSize}
          queryRef={queryRef}
        />
      ) : (<h1>Loading...</h1>)}
    </div>
  );
}
