import React from 'react'
import SnakbarAlert from './SnakbarAlert.js'


const FeedbackApi = ({ apiError, apiSuccess, setApiError, setApiSuccess }) => {
    return (
        <div>
            {(apiError && setApiError) && <SnakbarAlert open={apiError.length ? true : false} handleClose={() => setApiError([])} message={apiError} type="error" />}
            {(apiSuccess && setApiSuccess) && <SnakbarAlert open={apiSuccess.length ? true : false} handleClose={() => setApiSuccess([])} message={apiSuccess} type="success" />}
        </div>
    )
}

export default FeedbackApi