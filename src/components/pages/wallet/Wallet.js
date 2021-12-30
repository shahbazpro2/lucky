import { CheckBox } from '@mui/icons-material'
import { Button, Card, CardContent, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React, { useEffect } from 'react'
/* import { BlockFrostAPI } from '@blockfrost/blockfrost-js'; */
/* const API = new BlockFrostAPI({
    projectId: 'mainnetvZcIcrL2zrpDvdHa47mHR6ah7fcx9SnN'
}); */

const Wallet = () => {

    useEffect(() => {
        (async () => {
            /*  const address = await API.addresses(
                 'addr1qxqs59lphg8g6qndelq8xwqn60ag3aeyfcp33c2kdp46a09re5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qsgy6pz',
             );
             console.log('add', address)
  */
        })()

    }, [])

    return (
        <div className='mt-20 grid grid-cols-7'>
            <div className="col-start-3 col-span-3">
                <Card>
                    <CardContent className="text-center">
                        <div className="px-10 py-5 space-y-3">
                            <div className="text-lg">Check your wallet contents</div>
                            <TextField variant="standard" fullWidth />
                            <div className="grid grid-cols-2 pt-10">
                                <FormGroup>
                                    <FormControlLabel control={<CheckBox />} label="Join**" />
                                </FormGroup>
                                <Button variant="contained">Check</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default Wallet
