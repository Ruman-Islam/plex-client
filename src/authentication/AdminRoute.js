// import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from '../components/shared/Spinner';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebaseConfig';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');
    const [user, loading,] = useAuthState(auth);
    const { admin, adminLoading } = useAdmin(user);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (user) {
    //         if (!user.emailVerified) {
    //             navigate('/verify-email');
    //         }
    //     }
    // }, [user, navigate])

    if (loading || adminLoading) { // Preventing redirecting to login page //
        return <Spinner />
    }

    if (!user || !admin) {
        signOut(auth);
        localStorage.removeItem('accessToken');
        return <Navigate to='/login' />
    }

    if (token) {
        return children;
    } else {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }
};

export default AdminRoute;