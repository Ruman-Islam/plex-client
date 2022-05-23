import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';
import auth from '../../firebase/firebaseConfig';

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, googleUser, loading,] = useSignInWithGoogle(auth);

    useEffect(() => {
        if (googleUser) {
            navigate(from, { replace: true });
        }
    }, [googleUser, navigate, from]);

    if (loading) {
        return <Spinner />
    };

    return (
        <div onClick={async () => await signInWithGoogle()}
            className="google-btn">
            <div className="google-icon-wrapper">
                <img className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt='' />
            </div>
            <p className="btn-text"><b>Sign in with google</b></p>
        </div>
    );
};

export default SocialLogin;