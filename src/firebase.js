import firebase  from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBfkZMXfi2XK2O3yRiIQCy74hlPDnhGTzc",
    authDomain: "find-my-course-ce248.firebaseapp.com",
    projectId: "find-my-course-ce248",
    storageBucket: "find-my-course-ce248.appspot.com",
    messagingSenderId: "119588476937",
    appId: "1:119588476937:web:8678ff7148808ab41380d8",
    measurementId: "G-QLTSPW7BVK"
  };
  // Initialize Firebase
  const fire=firebase.initializeApp(firebaseConfig);
  export default fire;