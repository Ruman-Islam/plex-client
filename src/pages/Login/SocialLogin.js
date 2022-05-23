import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase/firebaseConfig';

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, googleUser, ,] = useSignInWithGoogle(auth);

    useEffect(() => {
        if (googleUser) {
            navigate(from, { replace: true });
        }
    }, [googleUser, navigate, from]);

    return (
        <div onClick={async () => await signInWithGoogle()}
            class="google-btn">
            <div class="google-icon-wrapper">
                <img class="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt='' />
            </div>
            <p class="btn-text"><b>Sign in with google</b></p>
        </div>
    );
};

export default SocialLogin;