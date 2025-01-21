import React from 'react';
import { Formik, FormikValues } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router';
import { userCreateMutation } from '../../api/graphql/user';
import { CreateUserInput, userCreateMutation$data } from '../../api/graphql/__generated__/userCreateMutation.graphql';

export function UserCreatePage(): React.ReactNode {
  const navigate = useNavigate();
  const [commitMutation, isMutationInFlight] = useMutation(
    userCreateMutation,
  );
  const handleSubmit = React.useCallback((values: FormikValues) => {
    commitMutation({
      variables: {
        input: values,
      },
      onCompleted(response) {
        window.alert(
          `Create User ${(response as userCreateMutation$data).createUser?.fullName} Success`
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
      name: 'email',
      type: 'email',
      label: 'E-Mail',
      placeholder: 'E-Mail',
    },
    {
      name: 'fullName',
      type: 'string',
      label: 'Full Name',
      placeholder: 'Full Name',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Password',
    },
  ], []);
  return (
    <div className="d-flex flex-column">
      <h1>Create User</h1>
      <Formik<CreateUserInput>
        initialValues={{
          email: '',
          fullName: '',
          password: '',
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