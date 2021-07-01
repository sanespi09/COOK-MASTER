import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDM8uayG1WzruM57wm5igDl6_BpXsIyAow",
    authDomain: "cookmaster-b9178.firebaseapp.com",
    databaseURL: "cookmaster-b9178.firebaseio.com",
    projectId: "cookmaster-b9178",
    storageBucket: "cookmaster-b9178.appspot.com",
    messagingSenderId: "816396502657",
    appId: "1:816396502657:web:250f262be2eedb8be02f80",
    measurementId: "G-R5SQNLGYSL"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
else { 
    firebase.app();
}

const db = firebase.firestore();

export { firebase, db };
