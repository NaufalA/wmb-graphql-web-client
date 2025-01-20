import React from 'react';
import { Formik } from 'formik';
import { ResetPasswordRequest } from '../../api/dto/auth.dto';
import api from '../../api';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';

export function ForgetPasswordPage(): React.ReactNode {
  const navigate = useNavigate();
  const submitReset = React.useCallback(async (request: ResetPasswordRequest) => {
    try {
      const response = await api.auth.resetPassword(request);

      window.confirm(`your password has been reset to ${response.newPassword}`)
      navigate("/auth/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return window.alert(error.response?.data.message || error);
      }
      window.alert(error);
    }
  }, [navigate]);
  return (
    <Formik<ResetPasswordRequest>
      initialValues={{
        email: '',
      }}
      onSubmit={submitReset}
    >
      {(props) => (
        <Form
          onSubmit={props.handleSubmit}
          onReset={props.handleReset}
        >
          <h1>Forget Password</h1>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
