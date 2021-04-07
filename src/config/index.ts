import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyC_vbYfuYr6zsW1vRgZQZFKPEaRH_pO-gc",
    authDomain: "emumba-gitnotes.firebaseapp.com",
    projectId: "emumba-gitnotes",
    storageBucket: "emumba-gitnotes.appspot.com",
    messagingSenderId: "990715741423",
    appId: "1:990715741423:web:c3fd433edab1c21e43471a",
    measurementId: "G-VJDF6M3K6Y"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase