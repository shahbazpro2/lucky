import { Card, CardContent } from '@mui/material'
import React, { useState } from 'react'
import FeedbackApi from '../../common/snakAlert/FeedbackApi'

const WalletList = ({ data }) => {
    const [apiSuccess, setApiSuccess] = useState()

    const copyAddress = (id, message) => {
        var copyText = document.getElementById(id);
        const text = copyText.innerHTML;
        navigator.clipboard.writeText(text);
        setApiSuccess([`${message} copied!`])
    }

    return (
        <div className='mt-10 md:mt-20'>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <Card sx={{ background: '#95ffff' }} >
                    <CardContent className="text-center cursor-pointer" onClick={() => copyAddress('address', 'Address')}>
                        <div className="text-xl font-bold mb-3">Address</div>
                        <div id="address" className="text-lg break-words px-3">
                            {data?.address}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="text-center cursor-pointer" onClick={() => copyAddress('stake', 'Stake address')}>
                        <div className="text-xl font-bold mb-3">Stake Address</div>
                        <div id="stake" className="text-lg break-words px-3">
                            {data?.stake}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-10 grid md:grid-cols-6 grid-cols-3 gap-4">
                {data.data?.map((d, index) => (
                    <div className='text-center relative' key={index}>
                        <div className="absolute right-20 bottom-[25px]">

                        </div>
                        <img className='mx-auto h-20 w-20 cursor-pointer' src={`https://ipfs.blockfrost.dev/ipfs/${d?.onchain_metadata?.image?.substr(7)}`} alt="img" />
                        <div className="text-sm">{d?.onchain_metadata?.name}</div>
                    </div>
                ))}

            </div>
            <FeedbackApi setApiSuccess={setApiSuccess} apiSuccess={apiSuccess} />
        </div>
    )
}

export default WalletList
