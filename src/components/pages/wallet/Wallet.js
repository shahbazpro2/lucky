import { CheckBox } from '@mui/icons-material'
import { Button, Card, CardContent, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React from 'react'

const Wallet = () => {
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
