import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebaseConfig';
import Spinner from '../components/shared/Spinner';

const PrivateRoute = () => {
    const location = useLocation();
    const [user, loading,] = useAuthState(auth);

    if (loading) { // Preventing redirecting to login page //
        return (
            <div className='min-h-screen flex flex-col items-center justify-center'>
                <Spinner />
            </div>
        )
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    } else {
        return <Outlet />;
    }
};

export default PrivateRoute;