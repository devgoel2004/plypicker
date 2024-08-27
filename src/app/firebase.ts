import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBI3QS35IsxIJcH3S3YpchmUYT0ojyqjW0",
  authDomain: "plypicker-7242c.firebaseapp.com",
  projectId: "plypicker-7242c",
  storageBucket: "plypicker-7242c.appspot.com",
  messagingSenderId: "874615064340",
  appId: "1:874615064340:web:dc2830691fe97685f06401",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
