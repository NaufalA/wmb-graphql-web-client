import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export function ForbiddenPage() {
  const redirectTo = "/";
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, 5000);
    return () => {
      clearTimeout(timeout);
    }
  });
  
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>403 Forbidden</h1>
      <h4>You are not allowed to access this page</h4>
      <p>You will be redirected to home page</p>
    </div>
  )
}