import { Button, Card, CardContent, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import API from '../../../api/API'
import FeedbackApi from '../../common/snakAlert/FeedbackApi'
import axios from 'axios'
import WalletList from './WalletList'
const Wallet = () => {
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState()
    const [data, setData] = useState()

    const submitWallet = async () => {
        if (!address) return
        setLoading(true)
        const res = await API(process.env.API || '' + '/blockfrost/', 'post', { address })
        console.log('res', res)
        if (res.error) {
            setApiError(res.data)
            return
        }
        setData(res.data)
        setLoading(false)

    }

    return (
        <>
            {!data ?
                <div className='mt-20 grid grid-cols-7'>
                    <div className="col-start-3 col-span-3">
                        <Card>
                            <CardContent className="text-center">
                                <div className="px-7 py-5 space-y-3">
                                    <div className="text-lg">Check your wallet contents</div>
                                    <TextField variant="standard" onChange={(e) => setAddress(e.target.value)} fullWidth />
                                    <div className="text-center">
                                        <LoadingButton loading={loading} variant="contained" onClick={submitWallet}>Check</LoadingButton>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                    <FeedbackApi apiError={apiError} setApiError={setApiError} />
                </div>
                :
                <WalletList data={data} />
            }
        </>
    )
}

export default Wallet
