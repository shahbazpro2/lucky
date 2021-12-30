import { Alert, Snackbar } from '@mui/material'
import React from 'react'


const SnakbarAlert = ({ open, handleClose, message, type }) => {
    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>

                {
                    Array.isArray(message) ?
                        message.map((m, index) => <div key={index} className="text-base">{m}</div>) :
                        <div className="text-base">{message}</div>
                }
            </Alert>
        </Snackbar>
    )
}

export default SnakbarAlert