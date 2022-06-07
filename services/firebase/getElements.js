import { getFirestore, getDocs, where, query, collection } from "firebase/firestore";

import { isDev } from "../../constants/env";

import {ELEMENTS_COLLECTION, ELEMENTS_FIELDS} from './constants'

const db = getFirestore();

export const getElements = async () => {
    let q;
    if (isDev()) {
        q = collection(db, ELEMENTS_COLLECTION)
    } else {
        q = query(collection(db, ELEMENTS_COLLECTION), where(ELEMENTS_FIELDS.ENABLED, '==', true));
    }

    const snap = await getDocs(q);
    const mapped = snap.docs.map(d => d.data())

    return mapped
}
