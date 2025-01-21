import React, { useTransition } from 'react';
import { useQueryLoader } from 'react-relay';
import { Link } from 'react-router';
import { userListQuery } from '../../../api/graphql/user';
import { userListQuery as userListQueryOperation } from '../../../api/graphql/__generated__/userListQuery.graphql';
import { UserList } from './user-list';
import { InputGroup, Button, Form } from 'react-bootstrap';

export function UserListPage(): React.ReactNode {
  const batchSize = 10;
  const [queryRef, loadQuery] =
    useQueryLoader<userListQueryOperation>(userListQuery);

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
          Create User
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
        <UserList batchSize={batchSize} queryRef={queryRef} />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
