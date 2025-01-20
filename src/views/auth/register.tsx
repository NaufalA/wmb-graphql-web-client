import React from 'react';
import { Formik } from 'formik';
import { RegisterRequest } from '../../api/dto/auth.dto';
import api from '../../api';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';

export function RegisterPage(): React.ReactNode {
  const navigate = useNavigate();
  const submitRegister = React.useCallback(async (request: RegisterRequest & { confirmPassword: string }) => {
    try {
      if (request.password !== request.confirmPassword) {
        throw new Error(`Password doesn't match`);
      }
      await api.auth.register(request);

      window.confirm('register success!');
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return window.alert(error.response?.data.message || error);
      }
      window.alert(error);
    }
  }, [navigate]);
  return (
    <Formik
      initialValues={{
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={submitRegister}
    >
      {(props) => (
        <Form
          onSubmit={props.handleSubmit}
          onReset={props.handleReset}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
