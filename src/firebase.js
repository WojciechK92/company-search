import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCO-FghVgGzBAZ57SnSbmYrCG6YLiwvXgk",
  authDomain: "company-search-58307.firebaseapp.com",
  databaseURL: "https://company-search-58307-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "company-search-58307",
  storageBucket: "company-search-58307.appspot.com",
  messagingSenderId: "993865229783",
  appId: "1:993865229783:web:03000898c6cebf4ce7d792"
};

const app = initializeApp(firebaseConfig);

export default app;
