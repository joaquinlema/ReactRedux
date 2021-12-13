import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    apiKey: process.env.REACT_APP_APIKEY,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

// const firebaseConfig = {
//     apiKey: "AIzaSyBxdr5Kk6de8gJg-1PKAO8ei1vBpiu1vOU",
//     authDomain: "reduxsaga-817e2.firebaseapp.com",
//     projectId: "reduxsaga-817e2",
//     storageBucket: "reduxsaga-817e2.appspot.com",
//     messagingSenderId: "333225193644",
//     appId: "1:333225193644:web:f229f7e12b235fa7b8ef09"
// };

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyBxdr5Kk6de8gJg-1PKAO8ei1vBpiu1vOU",
//     authDomain: "reduxsaga-817e2.firebaseapp.com",
//     projectId: "reduxsaga-817e2",
//     storageBucket: "reduxsaga-817e2.appspot.com",
//     messagingSenderId: "333225193644",
//     appId: "1:333225193644:web:c8ebeb2deda60ba9b8ef09"
// };


// if (process.env.NODE_ENV === 'test') {
//     // testing
//     firebase.initializeApp(firebaseConfigTesting);
// } else {
//     //dev/prod
//     firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}