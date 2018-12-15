  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/auth';
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDwW0YrMqqyTSwYzrrB6UYO5q1JgxQnMFY",
    authDomain: "marioplan-vd.firebaseapp.com",
    databaseURL: "https://marioplan-vd.firebaseio.com",
    projectId: "marioplan-vd",
    storageBucket: "marioplan-vd.appspot.com",
    messagingSenderId: "887352628751"
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;