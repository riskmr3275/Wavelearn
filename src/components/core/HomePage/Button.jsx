import React, { act } from 'react'
import {Link} from 'react-router-dom'
const Button = ({children,active,linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold  hover:scale-95 transition-all duration-500 ${active ? "bg-yellow-50 text-black":"bg-richblack-500 hover:scale-95 transition-all duration-300"}`}>
            {children}
        </div>
    </Link>
  )
}

export default Button