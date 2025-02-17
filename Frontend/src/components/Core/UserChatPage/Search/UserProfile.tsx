import React from 'react'

const UserProfile = ({data}:any) => {
  return (
    <div className='bg-richBlack-600 w-10/12 mx-auto p-3 rounded-xl hover:scale-105 transition-all duration-500 scrollbar-hidden cursor-pointer flex gap-3 items-center'>
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
