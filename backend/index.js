
import axios from 'axios'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json());
const port = 5000

axios.defaults.headers = { project_id: 'mainnetvZcIcrL2zrpDvdHa47mHR6ah7fcx9SnN' }

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
                // do something with the data
                const arr = data.map(data => data.data)

                res.send(arr)
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
        res.status(err.response.data.status_code).send(err.response.data.message)
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})