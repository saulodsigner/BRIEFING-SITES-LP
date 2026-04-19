import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import * as fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

(async () => {
    try {
        const docRef = await addDoc(collection(db, 'briefings'), {
            projectName: "Test Terminal",
            createdAt: new Date(),
            contactEmail: "test@test.com"
        });
        console.log("Written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})();
