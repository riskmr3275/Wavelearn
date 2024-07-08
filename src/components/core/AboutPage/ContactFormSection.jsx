import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'
const ContactFormSection = () => {
  return (
    <div className='mx-auto '>
        <h1 className='text-3xl font-extrabold text-brown-5 mb-2'>
            Get in touch
        </h1>
      <p className='font-semibold mb-5'>
        We'd love to here for you, Please fill out this form
      </p>
      <div>
        <ContactUsForm/>
      </div>
    </div>
  )
}

export default ContactFormSection
