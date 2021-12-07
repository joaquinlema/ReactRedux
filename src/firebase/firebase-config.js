import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyDFXW2W2SNV0lmj8HJogeu267hdD2HR5WE",
//     authDomain: "react-app-cursos.firebaseapp.com",
//     databaseURL: "https://react-app-cursos.firebaseio.com",
//     projectId: "react-app-cursos",
//     storageBucket: "react-app-cursos.appspot.com",
//     messagingSenderId: "959679322615",
//     appId: "1:959679322615:web:89d8e604eee1b5fd68f6f2"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBxdr5Kk6de8gJg-1PKAO8ei1vBpiu1vOU",
    authDomain: "reduxsaga-817e2.firebaseapp.com",
    projectId: "reduxsaga-817e2",
    storageBucket: "reduxsaga-817e2.appspot.com",
    messagingSenderId: "333225193644",
    appId: "1:333225193644:web:f229f7e12b235fa7b8ef09"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}