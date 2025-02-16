import React, { useEffect } from 'react'
import { FaPhone, FaVideo } from 'react-icons/fa6';
import { useParams } from 'react-router-dom'
import SendMessage from '../components/Core/UserChatPage/ConversationPage/SendMessage';
import Message from '../components/Core/UserChatPage/ConversationPage/Message';


const userData = {
    name:"Alok Ranjan",
    latestMessage:{
        message:"Click here to begin time",
        createdAt:'19/11/025'
    },
    profilepic:`https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
    active:'online'

}

const ConversationPage = () => {

    const {id} = useParams();
    useEffect(()=>{
        //fetching data from api
    },[id])

    return (
        <div className='w-full bg-richBlack-900 rounded-md h-full'>
            <div className='grid grid-rows-[60px_1fr_60px] max-h-full min-h-full bg-'>
                <div className='w-full bg-richBlack-800 rounded-t-md grid grid-cols-2 p-3'>
                    <div className='flex gap-5'>
                        <div className='cursor-pointer'>
                            <img 
                            src={userData?.profilepic}
                            alt='user logo'
                            className='object-fit rounded-full'
                            width={40}
                            height={40}

                            />
                        </div>
                        <div className='flex flex-col gap-0 text-lime-100 font-doto'>
                            <p>{userData?.name}</p>
                            <p className='text-xs'>{userData?.active}</p>
                        </div>
                    </div>
                    <div className='flex flex-row-reverse items-center gap-10 text-xl text-lime-100 mr-5'>
                        <div className='relative group cursor-pointer'>
                            <FaVideo />
                            <p className='absolute group-hover:block text-sm font-doto inset-0 top-5 left-1/2 -translate-1/2 hidden'>video</p>
                        </div>
                        <div
                        className='relative group cursor-pointer'
                        >
                            <FaPhone className=''/>
                            <p className='absolute group-hover:block text-sm font-doto inset-0 top-5 eft-1/2 -translate-1/2 hidden transition-all duration-1000'>call</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Message />
                </div>
                <div className='rounded-b-md p-1'>
                    <SendMessage />
                </div>

            </div>
        </div>
    )
}

export default ConversationPage
