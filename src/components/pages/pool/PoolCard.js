import { Card, CardContent } from '@mui/material'
import React from 'react'

const PoolCard = () => {
    return (
        <div>
            <Card>
                <CardContent className="text-center">
                    <div className="text-xl">0</div>
                    <div className="text-base">Minted Blocks</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PoolCard
