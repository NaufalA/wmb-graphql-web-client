import React from 'react';
import { Formik } from 'formik';
import { LoginRequest } from '../../api/dto/auth.dto';
import api from '../../api';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { LS_TOKEN } from '../../api/constants/local-storage-key';
import { AxiosError } from 'axios';

export function LoginPage(): React.ReactNode {
  const submitLogin = React.useCallback(async (request: LoginRequest) => {
    try {
      const loginResponse = await api.auth.login(request);

      window.confirm('login success!');
      localStorage.setItem(LS_TOKEN, loginResponse.token);
      window.location.assign("/")
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return window.alert(error.response?.data.message || error);
      }
      window.alert(error);
    }
  }, []);
  return (
    <Formik<LoginRequest>
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={submitLogin}
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Link type="button" className="btn text-primary" to="/auth/forget-password">
            Forget Password?
          </Link>
        </Form>
      )}
    </Formik>
  );
}
