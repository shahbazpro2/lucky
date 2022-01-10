
import axios from 'axios'
import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config();
const __dirname = path.resolve();

const app = express()
app.use(cors())
app.use(express.json());
const port = process.env.PORT || 5000
const buildPath = path.join(__dirname, '..', 'build')
app.use(express.static(buildPath))

axios.defaults.headers = { project_id: process.env.BLOCKFROST_ID }

app.post('/blockfrost', async (req, res) => {
    const address = req.body.address
    try {
        const res1 = await axios({
            method: 'GET',
            url: `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`
        })
        const res2 = await axios({
            method: 'GET',
            url: `https://cardano-mainnet.blockfrost.io/api/v0/accounts/${res1.data.stake_address}/addresses/assets`
        })
        let arr = []
        const data = res2.data
        Promise.all(data.map(f =>
            f.quantity === '1' && axios({
                method: 'GET',
                url: `https://cardano-mainnet.blockfrost.io/api/v0/assets/${f.unit}`
            })
        ))
            .then(data => {
                const arr = data.map(data => data.data)
                res.send({ data: arr, address, stake: res1.data.stake_address })
            })


    } catch (err) {
        if (err.response?.data)
            res.status(err.response?.data?.status_code).send(err.response?.data?.message)
        res.status(500).send(err)
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})