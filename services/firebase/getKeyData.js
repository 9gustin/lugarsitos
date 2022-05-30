import { getFirestore, getDoc, doc } from "firebase/firestore";

import {KEYS_COLLECTION} from './constants'

const db = getFirestore();

export const getKeyData = async key => {
    const docRef = doc(db, KEYS_COLLECTION, key);
    const docSnap = await getDoc(docRef);

    return docSnap.data()
}
