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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("[Error] unable to create User: ", err.message);
    }
  }

  return userRef;
}; // EoF createUserProfile

firebase.initializeApp(firebaseConfig);

// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = firestore.collection(collectionKey);
//   const batch = firestore.batch();
//   objectsToAdd.forEach((obj) => {
//     const docRef = collectionRef.doc(); // random generated id

//     batch.set(docRef, obj);
//   });

//   return await batch.commit();
// };

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
  const transformedCollection = collectionsSnapshot.docs.map((docSnapshot) => {
    const { title, items } = docSnapshot.data();

    return {
      reouteName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
