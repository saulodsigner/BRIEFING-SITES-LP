import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import * as fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

(async () => {
    try {
        const q = query(collection(db, 'briefings'));
        const querySnapshot = await getDocs(q);
        console.log("Documents count: ", querySnapshot.docs.length);
        querySnapshot.docs.forEach(doc => {
            console.log(doc.id, doc.data());
        });
        process.exit(0);
    } catch (e) {
        console.error("Error reading documents: ", e);
        process.exit(1);
    }
})();
