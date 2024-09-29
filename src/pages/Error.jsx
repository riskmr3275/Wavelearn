import React from 'react'

const Error = () => {
  return (
    <div className='flex flex-col gap-5 items-center  justify-center text-3xl text-white mt-96'>
        <div className='text-xl text-richblack-600'>No such route found</div>
       <div className="relative flex justify-center items-center">
       <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
       <img img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  className="rounded-full h-28 w-28" />
</div>
    </div>
  )
}

export default Error
