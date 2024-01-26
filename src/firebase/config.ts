// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCihiDyswWr-DrofDXrZMIvO_bACMruguo',
  authDomain: 'react-course-1810f.firebaseapp.com',
  projectId: 'react-course-1810f',
  storageBucket: 'react-course-1810f.appspot.com',
  messagingSenderId: '94003107425',
  appId: '1:94003107425:web:7f5b0d50de9fc4722f7c20'
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDb = getFirestore(firebaseApp)
