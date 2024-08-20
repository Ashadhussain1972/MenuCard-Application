import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyADUuv5VRpsgUZuRUTJ2BE3OlKoVhaPrRg",
    authDomain: "orderhere-bd574.firebaseapp.com",
    projectId: "orderhere-bd574",
    storageBucket: "orderhere-bd574.appspot.com",
    messagingSenderId: "832338689162",
    appId: "1:832338689162:web:bc6ec41dc671489b468173",
    measurementId: "G-NFCYWNSW8W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
