import React from 'react';
import { Formik, FormikValues } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router';
import { productCreateMutation } from '../../api/graphql/product';
import { productCreateMutation$data } from '../../api/graphql/__generated__/productCreateMutation.graphql';

export function ProductCreatePage(): React.ReactNode {
  const navigate = useNavigate();
  const [commitMutation, isMutationInFlight] = useMutation(
    productCreateMutation,
  );
  const handleSubmit = React.useCallback((values: FormikValues) => {
    commitMutation({
      variables: {
        input: values,
      },
      onCompleted(response) {
        window.alert(
          `Create Product ${(response as productCreateMutation$data).createProduct?.productName} Success`
        );
        navigate(-1);
      },
      onError(error) {
        window.alert(error)
      },
    });

  }, [commitMutation, navigate]);

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
      <h1>Create Product</h1>
      <Formik
        initialValues={{
          productName: '',
          price: 0,
          stock: 0,
          stockUnit: '',
        }}
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
                disabled={isMutationInFlight}
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