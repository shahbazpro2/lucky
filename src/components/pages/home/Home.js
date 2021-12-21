import React, { useEffect } from 'react'
import { getDatabase, ref, get, child } from "firebase/database";

const Home = () => {
    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `pool-info`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])
    return (
        <div className="mt-10 space-y-16">
            <div>
                <div className="text-xl mb-5 font-bold">Octupus</div>
                <div className="bg-lightYellow h-32 shadow-lg p-5 rounded-lg">
                    hello
                </div>
            </div>
            <div>
                <div className="text-xl mb-5 font-bold">Octupus</div>
                <div className="bg-lightYellow h-32 shadow-lg p-5 rounded-lg">
                    hello
                </div>
            </div>
        </div>
    )
}

export default Home
