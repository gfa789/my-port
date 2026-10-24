import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
// Static rendering and local review do not require production credentials.
export const db = config.apiKey && config.projectId ? getFirestore(initializeApp(config)) : null;
