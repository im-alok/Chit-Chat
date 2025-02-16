import React from 'react'
import SearchUser from '../components/Core/UserChatPage/SearchUser'
import WoodenBackground from '../components/common/Wooden-Background'
import Userfriend from '../components/Core/UserChatPage/Userfriend'
import { Outlet } from 'react-router-dom'

const UserChatPage = () => {


    return (
        <div className='grid grid-rows-[40px_1fr] gap-1 h-[calc(100vh-70px)] p-1'>
            <div className="flex justify-center items-center">
                <SearchUser />
            </div>
            <WoodenBackground customclasses={''}>
            <div className=" grid grid-cols-1 sm:grid-cols-[350px_1fr] gap-2 max-h-[calc(100vh-135px)] min-h-[calc(100vh-120px)]   p-1 m-1">
                {/* <div className='absolute bg-gradient-to-r from-black via-transparent to-black opacity-50 inset0 w-full h-full z-0'></div> */}

                <div className='relative justify-center items-center  z-10 max-h-[calc(100vh-135px)] overflow-scroll scrollbar-hidden'>
                    <Userfriend />
                </div>
                <div className='border-1  sm:flex hidden justify-center items-center z-10 max-h-[calc(100vh-135px)] min-h-[calc(100vh-135px)] rounded-md border-richBlack-800'>
                    <Outlet />
                </div>
            </div>
            </WoodenBackground>
        </div>
    )
}

export default UserChatPage
