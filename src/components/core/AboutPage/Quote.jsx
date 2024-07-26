import React from 'react'
import HighlightText from '../HomePage/HighLightText'

const Quote = () => {
  return (
    <div className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology"} />, 
              
        <HighlightText text={"Expertise"}/> 
        , and community to create an
         
           
        <HighlightText text={" unparalleled educational experience."}/> 

    </div>
  )
}

export default Quote