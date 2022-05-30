import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

class FirebaseAppSingleton {
    instance = null;

    getInstance() {
        if (!this.instance) {
            this.instance = initializeApp(firebaseConfig);
        }
        return this.instance;
    }
}

const app = new FirebaseAppSingleton();

export default app.getInstance();
