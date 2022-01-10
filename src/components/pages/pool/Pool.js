import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchApi } from '../../../api/responseApi'
import { numFormatter } from '../../functions/numFormatter'
import PoolCard from './PoolCard'

const Pool = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const res = await fetchApi('pool-information-heartbeat')
            console.log(res)
            setLoading(false)
            if (!res.error) {
                setData(res.data)
            }
        })()
    }, [])


    return (
        <div className='grid grid-cols-2 md:grid-cols-4 mt-10 md:mt-20 gap-5'>
            {
                loading ? <div className="col-span-4 text-center h-full">
                    <CircularProgress />
                </div> : <>
                    <PoolCard title="Minted Blocks" value={data?.blocksMinted} />
                    <PoolCard title="Delegators" value={data?.numberOfDelegators} />
                    <PoolCard title="Margin" value={`${data?.marginCost}%`} />
                    <PoolCard title="Our Pledge" value={numFormatter(data?.pledge)} />
                    <PoolCard title="Stake" value={numFormatter(data?.stake)} />
                </>
            }
        </div>
    )
}

export default Pool
