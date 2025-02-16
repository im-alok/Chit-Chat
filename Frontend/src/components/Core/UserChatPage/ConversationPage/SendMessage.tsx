import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";

const SendMessage = () => {
    
    const [message,setMessage] = useState<string >("");


    const changeHandler = (e:any)=>{
        const value = e.target.value;
        setMessage(value)
    }

    return (
        <div>
            <form className='flex gap-3'>
                <input 
                id='sendMessage'
                name='sendMessage'
                placeholder='Type your message'
                value={message}
                onChange={(e)=>changeHandler(e)}
                className='w-full focus:outline-0 bg-richBlack-700 p-3 rounded-lg font-arcuata text-lime-50'
                />
                
                <button className='bg-green-500 p-3 rounded-full mr-2 hover:bg-green-600 cursor-pointer active:scale-90 transition-all duration-150 ' 
                type='button'
                >
                    <div className='text-xl text-lime-50 '><IoSend /></div>
                </button>
            </form>
        </div>
    )
}

export default SendMessage
