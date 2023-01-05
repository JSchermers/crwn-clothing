import { auth, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import "../../routes/authentication/authentication.styles.scss"


const Authentication = () => {

    useEffect(() => {
        const myFunc =  async() => {
            const response = await getRedirectResult(auth);

            if(response) {
                const userDocRef = await createUserDocumentFromAuth(response.user)
            }
            }
        myFunc();
    }, [])

    return <div className="authentication-container">
        <h1>Sign In</h1>
        {/* <button onClick={logGoogleUser}>Sign in with Google popup</button>
        <button onClick={signInWithGoogleRedirect}>Sign in with Google redirect</button> */}
        <SignUpForm/>
        <SignInForm/>
    </div>
}

export default Authentication