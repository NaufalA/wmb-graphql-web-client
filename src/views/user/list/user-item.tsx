import { useFragment } from 'react-relay';
import { userDetailFragment$data, userDetailFragment$key } from '../../../api/graphql/__generated__/userDetailFragment.graphql'
import { userDetailFragment } from '../../../api/graphql/user';

type UserItemProps = {
  user: userDetailFragment$key | null | undefined;
  element: (data: userDetailFragment$data | null | undefined) => React.ReactNode;
}

export function UserItem({ user, element }: UserItemProps) {
  const data = useFragment(userDetailFragment, user);
  return element(data);
}