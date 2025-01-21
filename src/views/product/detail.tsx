import React from 'react';
import { useMutation, useQueryLoader } from 'react-relay';
import { productGetQuery, productUpdateMutation } from '../../api/graphql/product';
import { useNavigate, useParams } from 'react-router';
import { productGetQuery as productGetQueryOperation } from '../../api/graphql/__generated__/productGetQuery.graphql';
import { FormMode } from '../../constants';
import { productUpdateMutation$data, productUpdateMutation as productUpdateMutationOperation, UpdateProductInput } from '../../api/graphql/__generated__/productUpdateMutation.graphql';
import { ProductForm } from './product-form';

type ProductDetailPageProps = {
  mode: FormMode;
}

export function ProductDetailPage({ mode }: ProductDetailPageProps): React.ReactNode {
  const { id } = useParams();
  const [queryRef, loadQuery] = useQueryLoader<productGetQueryOperation>(
    productGetQuery,
  );

  React.useEffect(() => {
    loadQuery({ id: id || '' }, { fetchPolicy: 'store-or-network' });
  }, [id, loadQuery]);

  const navigate = useNavigate();
  const [commitMutation] = useMutation<productUpdateMutationOperation>(
    productUpdateMutation,
  );
  const handleSubmit = React.useCallback((values: UpdateProductInput) => {
    commitMutation({
      variables: {
        input: values,
      },
      onCompleted(response) {
        window.alert(
          `Update Product ${(response as productUpdateMutation$data).updateProduct?.productName} Success`
        );
        navigate(-1);
      },
      onError(error) {
        window.alert(error)
      },
    });

  }, [commitMutation, navigate]);


  if (queryRef) return (
    <ProductForm
      mode={mode}
      queryRef={queryRef}
      handleSubmit={handleSubmit}
    />
  );
  return <h1>Loading...</h1>;
}