import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

import { collection, addDoc, getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  collection,
  addDoc,
  getFirestore,
  sendPasswordResetEmail,
  initializeApp,
};