import React from "react";
import ContactUsForContact from "../components/core/Constactus/ContactUsForContact";
import Footer from "../components/common/Footer";
import { TiMessages } from "react-icons/ti";
import { FaEarthAfrica } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
const ContactUs = () => {
  return (
    <div>
      <div className="mx-auto max-w-maxContent">
        <div className="flex lg:flex-row  items-center justify-center gap-20 mt-40 mb-20 flex-col">
          {/* for list of data */}
          <div className="w-[50%] flex flex-col text-white bg-blue-700 rounded-md p-20 gap-10 m-0">
            <div >
              <div className="flex gap-3 items-center font-semibold">
                <TiMessages />
                <p>Chat on us</p>
              </div>
              <div className="text-white text-xl ml-8"><p>Our mission to assist in all possible risugupta208.nitb@gmail.com</p></div>
            </div>
            
            <div >
              <div className="flex gap-3 items-center font-semibold">
                <FaEarthAfrica />
                <p>Visit us</p>
              </div>
              <div className="text-white text-xl ml-8"><p>Free to visit <br />www.wavelearn.com</p></div>
            </div>

            <div >
              <div className="flex gap-3 items-center font-semibold">
                <IoCall />
                <p>Call us</p>
              </div>
              <div className="text-white text-xl ml-8"><p>Mon-Fri from 9am to 5pm <br />+91-9798571703</p></div>
            </div>
          </div>
          {/* for get in touch */}
          <div className="w-[50%]">
            <ContactUsForContact />
          </div>
        </div>
        
      </div>
      <Footer/>
    </div>
  );
};

export default ContactUs;
