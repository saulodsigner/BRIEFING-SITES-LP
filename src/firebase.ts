import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { BriefingData } from './types';
import firebaseConfig from '../firebase-applet-config.json';

let db: any = null;

export async function sendBriefing(data: BriefingData) {
  if (!db) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  try {
    const docRef = await addDoc(collection(db, 'briefings'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao enviar briefing:', error);
    throw error;
  }
}
