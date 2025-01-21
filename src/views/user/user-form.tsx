import React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay';
import { userDetailFragment, userGetQuery } from '../../api/graphql/user';
import { userGetQuery as userGetQueryOperation } from '../../api/graphql/__generated__/userGetQuery.graphql';
import { userDetailFragment$key } from '../../api/graphql/__generated__/userDetailFragment.graphql';
import { FormMode } from '../../constants';
import { UpdateUserInput } from '../../api/graphql/__generated__/userUpdateMutation.graphql';

type UserFormProps = {
  queryRef: PreloadedQuery<userGetQueryOperation>;
  mode: FormMode;
  handleSubmit: (values: UpdateUserInput) => void;
}

export function UserForm({ mode, queryRef, handleSubmit }: UserFormProps): React.ReactNode {
  const data = usePreloadedQuery(userGetQuery, queryRef)

  const user = useFragment<userDetailFragment$key>(
    userDetailFragment,
    data.getUser,
  )

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
      name: 'role',
      type: 'text',
      label: 'Role',
      placeholder: 'Role',
      dataList: [
        'Guest',
        'Admin',
        'SuperAdmin',
      ],
    },
  ], []);
  return (
    <div className="d-flex flex-column">
      <h1>Edit User {user?.fullName}</h1>
      <Formik<UpdateUserInput>
        initialValues={{
          id: user?.id || '',
          fullName: user?.fullName || '',
          email: user?.email || '',
          role: user?.role || '',
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
                value={props.values[f.name as keyof (typeof props.values)] || ''}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                disabled={mode === FormMode.VIEW}
                required
                list={`list-${f.name}`}
              />
              {f.dataList && (
                <datalist id={`list-${f.name}`}>
                  {f.dataList.map((d) => (
                    <option key={`list-${f.name}-${d}`} value={d} />
                  ))}
                </datalist>
              )}
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