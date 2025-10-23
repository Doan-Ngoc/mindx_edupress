import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const CustomerOnly = () => {
  const { userRole } = useAuth();
  return userRole === 'customer' ? (
    <Outlet />
  ) : (
    <Navigate to="/error/no-permission" />
  );
};

export default CustomerOnly;
