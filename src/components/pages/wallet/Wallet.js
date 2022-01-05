import { Button, Card, CardContent, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import API from '../../../api/API'
import FeedbackApi from '../../common/snakAlert/FeedbackApi'
import axios from 'axios'
axios.defaults.headers = { project_id: 'mainnetvZcIcrL2zrpDvdHa47mHR6ah7fcx9SnN' }
const Wallet = () => {
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState()

    useEffect(() => {
        (async () => {
            try {
                const res1 = await axios({
                    method: 'GET',
                    url: `https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1qxqs59lphg8g6qndelq8xwqn60ag3aeyfcp33c2kdp46a09re5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qsgy6pz`
                })
                const res2 = await axios({
                    method: 'GET',
                    url: `https://cardano-mainnet.blockfrost.io/api/v0/accounts/${res1.data.stake_address}/addresses/assets`
                })
                let arr = []
                const data = res2.data
                Promise.all(data.map(f =>
                    axios({
                        method: 'GET',
                        url: `https://cardano-mainnet.blockfrost.io/api/v0/assets/${f.unit}`
                    })
                ))
                    .then(data => {
                        // do something with the data
                        const arr = data.map(data => data.data)
                        console.log('data', arr)
                        //res.send(JSON.stringify(data))
                    })
                /* data.forEach(async f => {
                    if (f.quantity === "1") {
                        const res3 = await axios({
                            method: 'GET',
                            url: `https://cardano-mainnet.blockfrost.io/api/v0/assets/${f.unit}`
                        })
                        arr.push(res3.data)
                    }
                }) */


            } catch (err) {
                console.log('err', err)
            }
        })()

    }, [])

    const submitWallet = async () => {
        if (!address) return
        setLoading(true)
        const res = await API('http://localhost:5000/blockfrost/', 'post', { address })
        console.log('res', res)
        if (res.error) setApiError(res.data)
        setLoading(false)

    }

    return (
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
    )
}

export default Wallet
