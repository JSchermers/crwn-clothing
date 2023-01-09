// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
        prompt: "select_account" 
})

export const auth = getAuth();
export const signInWithGooglePopup = () => 
    signInWithPopup(auth, googleProvider);


export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((objectToAdd) => {
        const docRef = doc(collectionRef, objectToAdd.title.toLowerCase());

        batch.set(docRef, objectToAdd)
    })
    await batch.commit();
    console.log("done")
}

export const getCategoriesAndDocuments = async() => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapShot = await getDocs(q);
    const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
        const {title, items} = docSnapShot.data();
        acc[title.toLowerCase()] = items;
        return acc
    }, {})
    return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
    if(!userAuth) return;
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
                createdAt,
                ...additionalInfo
            })
        } catch (e) {
            console.log('error creating the user', e.message);
        }

    }

    return userDocRef;


}

export const createAuthUserWithEmailandPassword = async(email, password) => {
    if (!email || ! password) return;
    return createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailandPassword = async(email, password) => {
    if (!email || ! password) return;
    return signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () =>
    signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)