/* eslint-disable import/no-unresolved */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  // serverTimestamp,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

import {
  collection,
  addDoc,
  getFirestore,
  onSnapshot,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  orderBy,
  doc,
  updateDoc,
  // serverTimestamp,
  Timestamp,
  setDoc,
  arrayUnion,
  arrayRemove,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  collection,
  onAuthStateChanged,
  addDoc,
  query,
  orderBy,
  getDocs,
  getDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
  deleteDoc,
  getFirestore,
  sendEmailVerification,
  sendPasswordResetEmail,
  initializeApp,
  signOut,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  // serverTimestamp,
};

export const getUser = () => getAuth().currentUser;
