// import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from '../components/shared/Spinner';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebaseConfig';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = () => {
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
        return (
            <div className='min-h-screen flex flex-col items-center justify-center'>
                <Spinner />
            </div>
        )
    }

    if (!user || !admin) {
        signOut(auth);
        localStorage.removeItem('accessToken');
        return <Navigate to='/login' replace />
    }

    if (token) {
        return <Outlet />;
    } else {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }
};

export default AdminRoute;