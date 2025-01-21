import React, { useTransition } from 'react';
import { useQueryLoader } from 'react-relay';
import { Link } from 'react-router';
import { userListQuery } from '../../../api/graphql/user';
import { userListQuery as userListQueryOperation } from '../../../api/graphql/__generated__/userListQuery.graphql';
import { UserList } from './user-list';

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

  return (
    <div className="d-flex flex-column">
      <div className="d-flex gap-2">
        <Link to="create" className="btn btn-success">
          Create User
        </Link>
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
      </div>
      {queryRef && !isPending ? (
        <UserList batchSize={batchSize} queryRef={queryRef} />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
