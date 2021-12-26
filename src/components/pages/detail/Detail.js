import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchApi } from '../../../api/responseApi';

const Detail = () => {
    let params = useParams();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(params);
        (async () => {

            const res = await fetchApi('pool-info')
            setLoading(false)
            console.log(res)
            if (!res.error) {
                let list = res.data['nft-sections'].list
                list = list.filter(li => li.name === params.id)
                if (list.length) {
                    setData(list[0])
                }
            }
        })()
    }, [])

    return (
        <div className="py-20">
            {loading ? <div className="col-span-3 text-center h-full">
                <CircularProgress />
            </div> : <>
                <div className="text-xl mb-10 font-bold">{data.name}</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-5">
                    {data?.nfts?.map((d, index) => (
                        <div className='text-center' key={index}>
                            <img className='mx-auto h-20 w-20' src={d.url} alt="img" />
                            <div className="text-sm">{d.name}</div>
                        </div>
                    ))}
                </div>
            </>
            }
        </div>
    )
}

export default Detail
