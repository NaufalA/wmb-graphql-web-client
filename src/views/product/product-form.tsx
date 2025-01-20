import React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay';
import { productDetailFragment, productGetQuery } from '../../api/graphql/product';
import { productGetQuery as productGetQueryOperation } from '../../api/graphql/__generated__/productGetQuery.graphql';
import { productDetailFragment$key } from '../../api/graphql/__generated__/productDetailFragment.graphql';
import { FormMode } from '../../constants';
import { UpdateProductInput } from '../../api/graphql/__generated__/productUpdateMutation.graphql';

type ProductFormProps = {
  queryRef: PreloadedQuery<productGetQueryOperation>;
  mode: FormMode;
  handleSubmit: (values: UpdateProductInput) => void;
}

export function ProductForm({ mode, queryRef, handleSubmit }: ProductFormProps): React.ReactNode {
  const data = usePreloadedQuery(productGetQuery, queryRef)

  const product = useFragment<productDetailFragment$key>(
    productDetailFragment,
    data.getProduct,
  )

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
          id: product?.id || '',
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
            <Form.Group className="mb-3" controlId={`formBasic${f.name}`} key={f.name}>
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
          >
            Submit
          </Button>
        </Form>
        )}
      </Formik>
    </div>
  );
}