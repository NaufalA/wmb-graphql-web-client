import React from 'react';
import { useQueryLoader, useMutation } from 'react-relay';
import { useParams, useNavigate } from 'react-router';
import { UpdateUserInput, userUpdateMutation as userUpdateMutationOperation, userUpdateMutation$data } from '../../api/graphql/__generated__/userUpdateMutation.graphql';
import { userGetQuery as userGetQueryOperation } from '../../api/graphql/__generated__/userGetQuery.graphql';
import { userGetQuery, userUpdateMutation } from '../../api/graphql/user';
import { FormMode } from '../../constants';
import { UserForm } from './user-form';

type UserDetailPageProps = {
  mode: FormMode;
}

export function UserDetailPage({ mode }: UserDetailPageProps): React.ReactNode {
  const { id } = useParams();
  const [queryRef, loadQuery] = useQueryLoader<userGetQueryOperation>(
    userGetQuery,
  );

  React.useEffect(() => {
    loadQuery({ id: id || '' }, { fetchPolicy: 'store-or-network' });
  }, [id, loadQuery]);

  const navigate = useNavigate();
  const [commitMutation] = useMutation<userUpdateMutationOperation>(
    userUpdateMutation,
  );
  const handleSubmit = React.useCallback((values: UpdateUserInput) => {
    commitMutation({
      variables: {
        input: values,
      },
      onCompleted(response) {
        window.alert(
          `Update User ${(response as userUpdateMutation$data).updateUser?.fullName} Success`
        );
        navigate(-1);
      },
      onError(error) {
        window.alert(error)
      },
    });

  }, [commitMutation, navigate]);


  if (queryRef) return (
    <UserForm
      mode={mode}
      queryRef={queryRef}
      handleSubmit={handleSubmit}
    />
  );
  return <h1>Loading...</h1>;
}