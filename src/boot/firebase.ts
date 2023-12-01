// Import the functions you need from the SDKs you need
import { ExecException } from 'child_process';
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  User,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  signOut,
  FacebookAuthProvider,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCaPfjx7_F8vXr1DBYJQ0H7Q22v6rk6Wew',
  authDomain: 'thai-quake-f571e.firebaseapp.com',
  projectId: 'thai-quake-f571e',
  storageBucket: 'thai-quake-f571e.appspot.com',
  messagingSenderId: '395712835135',
  appId: '1:395712835135:web:d1df2b6be0438d9faad28a',
  measurementId: 'G-X9F35G95MS',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// const user = ref(null);

// export class CurrentUser {
//   private _name = '';

//   get name(): string {
//     return this._name;
//   }

//   set name(newName: string) {
//     if (newName.length > 0) {
//       this._name = newName;
//     } else {
//       console.error('Name should not be empty.');
//     }
//   }
// }

// const onAuthStateChanged = async () => {
//   return await new Promise((resolve, reject) => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       unsubscribe();
//       resolve(user);
//     }, reject);
//   });
// };

export const loginWithGoogle = async () => {
  try {
    const provider = await new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    throw new Error((error as ExecException).message);
  }
};

export const loginWithFacebook = async () => {
  try {
    const provider = await new FacebookAuthProvider();
    const user = await signInWithPopup(auth, provider);
    console.log('🚀  user:', user);

    return user;
  } catch (error) {
    throw new Error((error as ExecException).message);
  }
};

export const logout = async () => {
  return await signOut(auth);
};
