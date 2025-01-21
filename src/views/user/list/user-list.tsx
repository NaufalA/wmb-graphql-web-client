import React, { useContext, useTransition } from 'react';
import {
  PreloadedQuery,
  useMutation,
  usePaginationFragment,
  usePreloadedQuery,
} from 'react-relay';
import {
  userDeleteMutation,
  userListQuery,
  userPaginationFragment,
} from '../../../api/graphql/user';
import { UserItem } from './user-item';
import { userDetailFragment$data } from '../../../api/graphql/__generated__/userDetailFragment.graphql';
import { useNavigate } from 'react-router';
import { userListQuery as userListQueryOperation } from '../../../api/graphql/__generated__/userListQuery.graphql';
import { userPaginationQuery } from '../../../api/graphql/__generated__/userPaginationQuery.graphql';
import { userPaginationFragment$key } from '../../../api/graphql/__generated__/userPaginationFragment.graphql';
import { AuthContext } from '../../auth';
import { getField } from '../../util';

type UserListProps = {
  queryRef: PreloadedQuery<userListQueryOperation>;
  batchSize: number;
};
export function UserList({
  queryRef,
  batchSize,
}: UserListProps): React.ReactNode {
  const user = usePreloadedQuery<userListQueryOperation>(
    userListQuery,
    queryRef
  );
  const [isPending, startTransition] = useTransition();
  const { data, loadNext, refetch } = usePaginationFragment<
    userPaginationQuery,
    userPaginationFragment$key
  >(userPaginationFragment, user);
  const onLoadMore = React.useCallback(
    () =>
      startTransition(() => {
        loadNext(batchSize);
      }),
    [batchSize, loadNext]
  );

  const [commitDeleteMutation, isDeleteMutationInFlight] =
    useMutation(userDeleteMutation);

  const handleDelete = React.useCallback(
    (d: userDetailFragment$data | null | undefined) => {
      if (window.confirm(`delete user ${d?.fullName}?`)) {
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

  const authContext = useContext(AuthContext);
  const isSelf = React.useCallback(
    (d: userDetailFragment$data | null | undefined) => {
      return (
        d?.email === authContext?.loginState.user?.email &&
        d?.fullName === authContext?.loginState.user?.fullName
      );
    },
    [authContext]
  );

  const navigate = useNavigate();

  const tableHeader = React.useMemo(
    () => [
      {
        id: 'email',
        label: 'E-Mail',
      },
      {
        id: 'fullName',
        label: 'Full Name',
      },
      {
        id: 'role',
        label: 'Role',
      },
      {
        id: 'createTime',
        label: 'Created at',
        render: (d: userDetailFragment$data | null | undefined) =>
          d?.createTime ? new Date(d.createTime).toLocaleString() : '',
      },
      {
        id: 'updateTime',
        label: 'Last Updated',
        render: (d: userDetailFragment$data | null | undefined) =>
          d?.updateTime ? new Date(d.updateTime).toLocaleString() : '',
      },
      {
        id: 'action',
        label: 'Action',
        render: (d) => !isSelf(d) ? (
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary"
              disabled={isLoading}
              onClick={() => navigate(d?.id as string)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(d)}
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        ) : '',
      },
    ],
    [handleDelete, isLoading, isSelf, navigate]
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
          {data?.listUsers.edges.map((e, i) => (
            <UserItem
              key={e?.cursor}
              user={e?.node}
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
          {data?.listUsers.pageInfo.hasNextPage && (
            <button type="button" onClick={onLoadMore} disabled={isPending} />
          )}
        </tbody>
      </table>
    </>
  );
}
