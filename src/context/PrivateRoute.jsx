import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext'; 

const PrivateRoute = () => {
  const { loading, isAuthenticated } = useContext(UserContext);
  console.log('loading', loading);
  console.log('isAuthenticated', isAuthenticated);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;