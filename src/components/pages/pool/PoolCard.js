import { Card, CardContent } from '@mui/material'
import React from 'react'

const PoolCard = ({ title, value }) => {
    return (
        <div>
            <Card variant="outlined" className="h-[100px]">
                <CardContent className="text-center">
                    <div className="text-xl">{value}</div>
                    <div className="text-base">{title}</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PoolCard
