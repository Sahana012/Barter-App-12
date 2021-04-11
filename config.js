import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyActCxGo7VgIxl_RVGKhv4SGGRBZ93oqf4",
  authDomain: "barterapp-39970.firebaseapp.com",
  projectId: "barterapp-39970",
  storageBucket: "barterapp-39970.appspot.com",
  messagingSenderId: "1063505540849",
  appId: "1:1063505540849:web:dfbd060d79c800a393db50"
};
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
