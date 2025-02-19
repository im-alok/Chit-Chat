import React from 'react'
import { createChat } from '../../../../Services/Operations/chatOperations'
import { useDispatch } from 'react-redux'

const UserProfile = ({data}:any) => {

  const dispatch = useDispatch();

  async function onClickHandler(){
    await createChat(`${data.firstName} ${data.lastName}`,[data.id],dispatch)
  }

  return (
    <div className='bg-richBlack-600 w-10/12 mx-auto p-3 rounded-xl hover:scale-105 transition-all duration-500 scrollbar-hidden cursor-pointer flex gap-3 items-center'
    onClick={onClickHandler}
    >
        <div>
          <img 
          src={data.profilePic}
          className='rounded-full object-cover'
          width={30}
          height={30}
          />
        </div>

        <div className='text-lime-200'>
          <p className='text-sm'>{data.firstName} {data.lastName}</p>
          <p className='text-xs'>{data.email}</p>
        </div>
    </div>
  )
}

export default UserProfile
