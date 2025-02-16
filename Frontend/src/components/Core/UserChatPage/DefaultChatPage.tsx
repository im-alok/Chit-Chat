import React from 'react'
import { FaGithub } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const DefaultChatPage = () => {

    const navigate = useNavigate()

  return (
    <div className='bg-richBlack-900 w-full h-full rounded-md flex justify-center items-center text-lime-white font-doto text-3xl flex-col'>
        Welcome to Connect Chat!!
        <p className='flex gap-2'>
            Take your time and Star us on GitHub
            <a 
            href='https://github.com/im-alok/Chit-Chat'
            target='_blank'
            ><FaGithub /></a>
        </p>
    </div>
  )
}

export default DefaultChatPage
