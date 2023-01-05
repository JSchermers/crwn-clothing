// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8SpPOCQ9iK0fgs00xNwR14uZs4f6IPKc",
  authDomain: "crwn-cloting-db-3217a.firebaseapp.com",
  projectId: "crwn-cloting-db-3217a",
  storageBucket: "crwn-cloting-db-3217a.appspot.com",
  messagingSenderId: "555502899648",
  appId: "1:555502899648:web:1e84be3a1376658525f825"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
        prompt: "select_account" 
})

export const auth = getAuth();
export const signInWithGooglePopup = () => 
    signInWithPopup(auth, provider);


export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapShot = await getDoc(userDocRef);
    
    if(!userSnapShot.exists()) {
        // create set document with data
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (e) {
            console.log('error creating the user', e.message);
        }

    }

    return userDocRef;


}
