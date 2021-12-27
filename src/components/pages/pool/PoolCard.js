import { Card, CardContent } from '@mui/material'
import React from 'react'

const PoolCard = ({ title, value }) => {
    return (
        <div>
            <Card variant="outlined">
                <CardContent className="text-center">
                    <div className="text-xl">{value}</div>
                    <div className="text-base">{title}</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PoolCard
