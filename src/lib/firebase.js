import * as FirebaseModule from 'firebase';
import firebaseConfig from '../constants/firebase';

const {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket,
  messagingSenderId,
} = firebaseConfig;

let firebaseInitialized = false;

if (
  apiKey !== 'null' &&
  authDomain !== 'null' &&
  databaseURL !== 'null' &&
  storageBucket !== 'null' &&
  messagingSenderId !== 'null'
) {
  FirebaseModule.initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    storageBucket,
    messagingSenderId,
  });

  firebaseInitialized = true;
}
//Link to the firebase data base
export const FirebaseRef = firebaseInitialized ? FirebaseModule.database().ref() : null;
//reference to the app instance that was initialized
export const Firebase = firebaseInitialized ? FirebaseModule : null;
