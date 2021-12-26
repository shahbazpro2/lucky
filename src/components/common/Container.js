import React from 'react'

const Container = ({ children }) => {
    return (
        <div className="container lg:px-20 px-10 mx-auto">
            {children}
        </div>
    )
}

export default Container
