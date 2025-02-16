import React from 'react'
import { useNavigate } from 'react-router-dom'

const data = [
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    },
    {
        name:"Alok Ranjan",
        latestMessage:{
            message:"Click here to begin time",
            createdAt:'19/11/025'
        },
        profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`

    }
]


const Userfriend = () => {

    const navigate = useNavigate()

    return (
        <div className='w-full flex flex-col font-dm-sans gap-[2px] bg-richBlack-900'>
            {
                data?.map((friend,index)=>(
                    <div
                    className=' flex gap-2 items-center p-5 cursor-pointer border-2 border-neutral-900 bg-richBlack-800 text-lime-100 rounded-md hover:scale-[101%] transition-normal duration-200 hover:shadow-[0px_0px_5px_1px_#171717] inset-shadow-neutral-600 inset-shadow-2xs'
                    key={index}
                    onClick={()=>navigate('/chatapp/sdsds')}
                    >
                        <div className='border-2 border-amber-950 rounded-full'>
                            <img 
                            src={friend?.profilepic}
                            width={40}
                            height={40}
                            className='rounded-full'
                            />
                        </div>
                        <div className='w-full'>
                            <p>{friend?.name}</p>
                            <div className='flex gap-2 justify-between w-full text-xs'>
                                <p className='italic '>{friend.latestMessage.message}</p>
                                <p>{friend.latestMessage.createdAt}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Userfriend
