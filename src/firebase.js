import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyAr4czhqVuKQX6txzvZd4qlucEolRV6d0Q",
    authDomain: "react-crud-db-238c1.firebaseapp.com",
    projectId: "react-crud-db-238c1",
    storageBucket: "react-crud-db-238c1.appspot.com",
    messagingSenderId: "1075924707406",
    appId: "1:1075924707406:web:5675fdfc35be13cfee7b1f",
    measurementId: "G-X4R8E1C9Y8"
};

const firebaseDB = firebase.initializeApp(firebaseConfig)
export default firebaseDB.database().ref()