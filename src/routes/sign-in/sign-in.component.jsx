import { auth, signInWithGooglePopup,  signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {

    useEffect(() => {
        const myFunc =  async() => {
            const response = await getRedirectResult(auth);

            if(response) {
                const userDocRef = await createUserDocumentFromAuth(response.user)
            }
            }
        myFunc();
    }, [])

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    } 
    return <div>
        <h1>Sign In</h1>
        <button onClick={logGoogleUser}>Sign in with Google popup</button>
        <button onClick={signInWithGoogleRedirect}>Sign in with Google redirect</button>
        <SignUpForm/>
    </div>
}

export default SignIn