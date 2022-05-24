import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebaseConfig';
import Spinner from '../components/shared/Spinner';


const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const [user, loading,] = useAuthState(auth);

    if (loading) { // Preventing redirecting to login page //
        return <Spinner />
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    } else {
        return children;
    }
};

export default PrivateRoute;