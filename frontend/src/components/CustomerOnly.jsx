import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProviderOnly = () => {
  const { userRole } = useAuth();

  return userRole === 'provider' ? (
    <Outlet />
  ) : (
    <Navigate to="/error/no-permission" />
  );
};

export default ProviderOnly;
