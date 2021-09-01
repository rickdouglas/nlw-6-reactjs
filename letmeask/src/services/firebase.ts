import firebase from "firebase/app";

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {

    apiKey: "AIzaSyD9-y6CeRcYGymGxet1PTsNb7uulUx6FDI",
    authDomain: "letmeask-87936.firebaseapp.com",
    databaseURL: "https://letmeask-87936-default-rtdb.firebaseio.com",
    projectId: "letmeask-87936",
    storageBucket: "letmeask-87936.appspot.com",
    messagingSenderId: "765813041740",
    appId: "1:765813041740:web:eb66931f57012bae6de2e9"

  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);
/**
 * Importar os serviços que serao utilizados do Firebase 
 */
const auth = firebase.auth();
const database = firebase.database();

export {firebase, auth, database}