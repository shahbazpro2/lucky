import React, { useEffect, useState } from 'react'
import { getDatabase, ref, get, child } from "firebase/database";

const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `pool-info`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val()['nft-sections'].list);
                setData(snapshot.val()['nft-sections'].list)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])
    return (
        <div className="my-20 grid grid-cols-3 gap-12">
            {data.map((d, index) => (
                <div key={index}>
                    <div className="text-xl mb-5 font-bold">{d.name}</div>
                    <div className="bg-lightYellow border-[1px] boder-[#e9e9e9] h-[350px] hover:shadow-lg p-5 cursor-pointer rounded-lg flex items-center justify-center">
                        <img src={d.previewURL} alt="thumbnail" width='300' />
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Home
