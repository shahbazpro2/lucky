import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='h-[72px] shadow-md shadow-gray-400 bg-gray-800 text-white'>
            <div className="container px-20 mx-auto h-full flex items-center">
                <Link to="/"><div className='text-xl cursor-pointer'>LuckyApp</div></Link>
                <div className="ml-auto space-x-7 flex">
                    <Link to="/pool">  <div className="cursor-pointer">Pool Information</div></Link>
                    <Link to="/wallet"> <div className="cursor-pointer">Wallet Contents</div></Link>
                    <Link to="/contact"> <div className="cursor-pointer">Contact Us</div></Link>
                </div>
            </div>

        </div>
    )
}

export default Header
