import React from 'react'

const Container = ({ children }) => {
    return (
        <div className="container lg:px-20 px-5 mx-auto">
            {children}
        </div>
    )
}

export default Container
