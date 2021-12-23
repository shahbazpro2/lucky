import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchApi } from '../../../api/responseApi';

const Home = () => {
    let navigate = useNavigate();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        /* const dbRef = ref(getDatabase()); */
        (async () => {

            const res = await fetchApi('pool-info')
            setLoading(false)
            if (!res.error) {
                setData(res.data['nft-sections'].list)
            }
        })()

    }, [])
    return (
        <div className="my-20 grid grid-cols-3 gap-12">
            {loading ?
                <div className="col-span-3 text-center h-full">
                    <CircularProgress />
                </div>
                :
                data.map((d, index) => (
                    <div key={index} onClick={() => navigate(`/detail/${d.name}`)}>
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
