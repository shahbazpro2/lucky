import { getDatabase, ref, get, child } from "firebase/database";

export const fetchApi = async (url) => {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, url))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return { error: false, data: snapshot.val() }
            } else return { error: false, data: null }
        })
        .catch(err => { return { error: true, data: err } })
}