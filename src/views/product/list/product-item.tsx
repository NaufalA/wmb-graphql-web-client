import { useFragment } from 'react-relay';
import { productDetailFragment$data, productDetailFragment$key } from '../../../api/graphql/__generated__/productDetailFragment.graphql'
import { productDetailFragment } from '../../../api/graphql/product';

type ProductItemProps = {
  product: productDetailFragment$key | null | undefined;
  element: (data: productDetailFragment$data | null | undefined) => React.ReactNode;
}

export function ProductItem({ product, element }: ProductItemProps) {
  const data = useFragment(productDetailFragment, product);
  return element(data);
}