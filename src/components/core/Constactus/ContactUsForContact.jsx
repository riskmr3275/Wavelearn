import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

const ContactUsForContact = () => {
  return (
    <div className='mx-auto  border-[1px] rounded-md border-richblack-700 p-9 '>
    <h1 className='text-3xl font-extrabold text-brown-5 mb-2'>
       Got a Idea?We've got the skills Let's team up
    </h1>
  <p className='font-semibold mb-5 text-white'>
    Tell us more yourself and what you've in mind
  </p>
  <div>
    <ContactUsForm/>
  </div>
</div>
  )
}

export default ContactUsForContact
