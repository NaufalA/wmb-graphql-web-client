import React from 'react';
import { Formik, FormikValues } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useFragment, useLazyLoadQuery, useMutation } from 'react-relay';
import { productDetailFragment, productGetQuery, productUpdateMutation } from '../../api/graphql/product';
import { useNavigate, useParams } from 'react-router';
import { productGetQuery as productGetQueryOperation } from '../../api/graphql/__generated__/productGetQuery.graphql';
import { productDetailFragment$key } from '../../api/graphql/__generated__/productDetailFragment.graphql';
import { FormMode } from '../../constants';
import { productUpdateMutation$data, productUpdateMutation as productUpdateMutationOperation } from '../../api/graphql/__generated__/productUpdateMutation.graphql';

type ProductDetailPageProps = {
  mode: FormMode;
}

export function ProductDetailPage({ mode }: ProductDetailPageProps): React.ReactNode {
  const { id } = useParams();
  const data = useLazyLoadQuery<productGetQueryOperation>(
    productGetQuery,
    {
      id: id || '',
    }
  )

  const product = useFragment<productDetailFragment$key>(
    productDetailFragment,
    data.getProduct,
  )

  const navigate = useNavigate();
  const [commitMutation, isMutationInFlight] = useMutation<productUpdateMutationOperation>(
    productUpdateMutation,
  );
  const handleSubmit = React.useCallback((values: FormikValues) => {
    commitMutation({
      variables: {
        input: {
          ...values,
          id: product?.id || '',
        },
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

  }, [commitMutation, navigate, product?.id]);
  

  const inputConfig = React.useMemo(() => [
    {
      name: 'productName',
      type: 'text',
      label: 'Product Name',
      placeholder: 'Product Name',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price',
      placeholder: 'Price',
    },
    {
      name: 'stock',
      type: 'number',
      label: 'Stock',
      placeholder: 'Stock',
    },
    {
      name: 'stockUnit',
      type: 'text',
      label: 'Stock Unit',
      placeholder: 'Stock Unit',
    },
  ], []);
  return (
    <div className="d-flex flex-column">
      <h1>Edit Product {product?.productName}</h1>
      <Formik
        initialValues={{
          productName: product?.productName || '',
          price: product?.price || 0,
          stock: product?.stock || 0,
          stockUnit: product?.stockUnit || '',
        }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {(props) => (
        <Form
          onSubmit={props.handleSubmit}
          onReset={props.handleReset}
        >
          {inputConfig.map((f) => (
            <Form.Group className="mb-3" controlId={`formBasic${f.name}`}>
              <Form.Label>{f.label}</Form.Label>
              <Form.Control
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                value={props.values[f.name as keyof (typeof props.values)]}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                disabled={mode === FormMode.VIEW}
                required
              />
            </Form.Group>
          ))}
          <Button
            variant="primary"
            type="submit"
            disabled={isMutationInFlight}
          >
            Submit
          </Button>
        </Form>
        )}
      </Formik>
    </div>
  );
}