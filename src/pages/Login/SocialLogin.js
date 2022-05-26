import React, { useEffect } from 'react';
import { message } from 'antd';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';
import auth from '../../firebase/firebaseConfig';
import useToken from '../../hooks/useToken';

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, googleUser, loading, error] = useSignInWithGoogle(auth);
    const { token } = useToken(googleUser);

    useEffect(() => {
        console.log(token);
        if (token) navigate(from, { replace: true });
        if (error) message.error(error?.message.split('/')[1].split(')')[0]);
    }, [token, error, navigate, from]);

    if (loading) {
        return <Spinner component='social' />
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