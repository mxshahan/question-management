import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDx6wJo6g1XRd829JDEnn8rT-D2909BtZ0',
  authDomain: 'paperless-time-study-732c3.firebaseapp.com',
  databaseURL: 'https://paperless-time-study-732c3.firebaseio.com',
  projectId: 'paperless-time-study-732c3',
  storageBucket: 'paperless-time-study-732c3.appspot.com',
  messagingSenderId: '444957253371',
  appId: '1:444957253371:web:0084e6d7ebbda5ae'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const firestore = firebase.firestore();

export {
  firebase,
  database,
  firestore
};