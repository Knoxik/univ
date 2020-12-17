import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDcYs0LgGERna6jEWROz6R4loDil-U_wC4",
    authDomain: "crwn-db-439eb.firebaseapp.com",
    databaseURL: "https://crwn-db-439eb.firebaseio.com",
    projectId: "crwn-db-439eb",
    storageBucket: "crwn-db-439eb.appspot.com",
    messagingSenderId: "480997987686",
    appId: "1:480997987686:web:c9cd6bac7b224de84964a7"
}

export const createUserProfileDocumnt = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const sighInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;