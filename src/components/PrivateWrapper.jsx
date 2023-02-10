import { Navigate, Outlet } from 'react-router-dom';

function PrivateWrapper() {
    const user = localStorage.getItem('user');
    return user ? <Outlet /> : <Navigate to='/login' replace />;
}

export default PrivateWrapper;
