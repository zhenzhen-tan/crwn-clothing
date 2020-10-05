import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDIZzv2mGiktDh7R0kVkiIuY0Vg74g0Eq0",
    authDomain: "crwn-db-c52c1.firebaseapp.com",
    databaseURL: "https://crwn-db-c52c1.firebaseio.com",
    projectId: "crwn-db-c52c1",
    storageBucket: "crwn-db-c52c1.appspot.com",
    messagingSenderId: "430444887919",
    appId: "1:430444887919:web:29628803bea4f57ccdf29a",
    measurementId: "G-TWN12SFJD0"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

