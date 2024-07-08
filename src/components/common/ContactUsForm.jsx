import { space } from "postcss/lib/list";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (formData) => {
    setLoading(true);
    // Your form submission logic here
    setLoading(false); // Example: setLoading(false) after API call or form submission
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phoneNo: "",
        message: "",
        // Add other fields to reset here
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div>
      <form onSubmit={handleSubmit(submitContactForm)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-4 items-center">
            {/* Firstname */}
            <div>
              <label
                htmlFor="firstname"
                className="font-semibold text-blue-200"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                {...register("firstname", { required: true })}
                className="w-full px-3 py-2 rounded-md text-richblack-25 bg-richblack-700"
              />
              {errors.firstname && <span>First name is required</span>}
            </div>
            {/* Lastname */}
            <div>
              <label htmlFor="lastname" className="font-semibold text-blue-200">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter last name"
                {...register("lastname", { required: true })}
                className="w-full px-3 py-2 rounded-md text-richblack-25 bg-richblack-700"
              />
              {errors.lastname && <span>Last name is required</span>}
            </div>
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="font-semibold text-blue-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 rounded-md text-richblack-25 bg-richblack-700"
            />
            {errors.email && <span>Email address is required</span>}
          </div>
          <div>
            <textarea
              name="message"
              id="message"
              placeholder="Enter your text here...."
              {...register("message", { required: true })}
              className="w-full p-3 px-5 lg:h-44 rounded-md text-richblack-25 bg-richblack-700"
            ></textarea>
            {errors.message && <span>Message is required</span>}
          </div>
          {/* Add more fields as needed */}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
