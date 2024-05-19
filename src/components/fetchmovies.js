import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, getDoc, onSnapshot, query, collection, orderBy, addDoc, updateDoc,  deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import React, { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyCnANtG2TTFL35wkslDPxwLF1ga-RqqenY",
  authDomain: "moviereviews-7da31.firebaseapp.com",
  projectId: "moviereviews-7da31",
  storageBucket: "moviereviews-7da31.appspot.com",
  messagingSenderId: "145179510636",
  appId: "1:145179510636:web:0e53cab8cf2b6800de1549"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchMovies = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
      const q = query(collection(db, 'reviews'), orderBy('id'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
          const reviewsData = [];
          snapshot.forEach((doc) => {
              const review = { id: doc.id, ...doc.data() }; // Include document ID along with data
              const document_id = doc.id;
              reviewsData.push({ document_id, ...review });
          });
          setReviews(reviewsData);
      });

      return () => {
          unsubscribe();
      };
  }, []);

  return reviews;
};

export function addReview(data) {
  // Update Firestore document with new data
  const docRef = addDoc(collection(db, "reviews"), {
      id: data.id,
      Title: data.title,
      Rating: data.rating,
      Genre: data.genre,
      Director: data.director,
      Day: data.day,
      Month: data.month,
      Year: data.year
  });
  // console.log("Document written with ID: ", docRef.id);
}

export function deleteReview(docId) {
  const reviewRef = doc(collection(db, "reviews"), docId);
  console.log(reviewRef);
  deleteDoc(reviewRef)
    .then(() => {
       console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

export function updateReview(docId, data) {
  const reviewRef = doc(collection(db, "reviews"), docId);
  updateDoc(reviewRef, {
      Title: data.Title,
      Rating: data.Rating,
      Genre: data.Genre,
      Director: data.Director,
      Day: data.Day,
      Month: data.Month,
      Year: data.Year
  })
    .then(() => {
      // console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
}

export async function fetchbyId(id) {
  try {
    const reviewRef = doc(collection(db, "reviews"), id);
    const docSnap = await getDoc(reviewRef);
    if (docSnap.exists()) {
      return docSnap.data(); // Return document data
    } else {
      console.log("No such document!");
      return null; // Return null if no document found
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
    return null; // Return null if there is an error
  }
}

export default fetchMovies;