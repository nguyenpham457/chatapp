// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzzHKkwgCX8IaYfnUjlsI8ob7_kquxUiw",
  authDomain: "chat-app-50d80.firebaseapp.com",
  projectId: "chat-app-50d80",
  storageBucket: "chat-app-50d80.appspot.com",
  messagingSenderId: "735761624871",
  appId: "1:735761624871:web:a03bb9999056b0628a8302",
  measurementId: "G-DS9K200X51"
};

// Initialize Firebase
const firebaseApp  = initializeApp(firebaseConfig);
// const provider = new firebaseApp.auth.GoogleAuthProvider();
// const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);
const db =  getFirestore(firebaseApp);

export {db, auth};
export default firebaseApp;