import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWKV3gGSFCGRg3yeHxP9zQvX5CGlFsj9M",
  authDomain: "ecommerce-demo-3ba94.firebaseapp.com",
  databaseURL: "https://ecommerce-demo-3ba94.firebaseio.com",
  projectId: "ecommerce-demo-3ba94",
  storageBucket: "ecommerce-demo-3ba94.appspot.com",
  messagingSenderId: "718697288480",
  appId: "1:718697288480:web:e6ee4cc8145bad43abfd45",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
