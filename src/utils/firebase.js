import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  collection,
  Timestamp,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  connectFirestoreEmulator
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDrtj71l3VbmET1bKGtekAsifVzRlUmgHU',
  authDomain: 'dininginformate.firebaseapp.com',
  databaseURL: 'https://dininginformate-default-rtdb.firebaseio.com',
  projectId: 'dininginformate',
  storageBucket: 'dininginformate.appspot.com',
  messagingSenderId: '1060468020333',
  appId: '1:1060468020333:web:c01879a1caf592d703db64',
  measurementId: 'G-J40KDS27KG'
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

if (!window.EMULATION && import.meta.env.PROD !== true) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);

  window.EMULATION = true;
}

export async function submitForm(diningHallId, waitTime, rating) {
  try {
    const waitingTimesRef = await addDoc(collection(db, 'Waiting Times'), {
      'Dining Hall Id': diningHallId,
      'Wait Time': waitTime,
      Timestamp: Timestamp.now()
    });
    const ratingsRef = await addDoc(collection(db, 'Ratings'), {
      'Dining Hall Id': diningHallId,
      Stars: rating,
      Timestamp: Timestamp.now()
    });
    console.log('Document written with ID: ', waitingTimesRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
  return 0;
}

export const useDbData = (collectionName, parsingFn) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const itemsColRef = collection(db, collectionName);
    const dataQuery = query(itemsColRef, orderBy('Timestamp', 'asc'));

    const unsubscribe = onSnapshot(
      dataQuery,
      (querySnapshot) => {
        const updatedData = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
        const parsedData = parsingFn(updatedData);
        setData(parsedData);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError('Failed to get wait times');
      }
    );
    return unsubscribe;
  }, []);

  return [data, error, loading];
};
