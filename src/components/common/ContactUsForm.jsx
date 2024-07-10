import { space } from "postcss/lib/list";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { apiConnector } from "../../services/apiconnector";

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
    console.log(formData);
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/auth/feedback",
        formData
      );
      console.log("Response from Feedback ROute", response);
      toast.success("Thank you for your valuable feedback!😍", {
        duration: 4000, // Set duration in milliseconds
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Please try again!🤦‍♂️", {
        duration: 4000, // Set duration in milliseconds
      });
      setLoading(false);
    }
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
                First Name *
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                {...register("firstname", { required: true })}
                className="w-full px-3 py-2 rounded-md text-richblack-25 bg-richblack-700 focus:outline-none"
              />
              {errors.firstname && <span>First name is required</span>}
            </div>
            {/* Lastname */}
            <div>
              <label htmlFor="lastname" className="font-semibold text-blue-200">
                Last Name *
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter last name"
                {...register("lastname", { required: true })}
                className="w-full px-3 py-2 rounded-md text-richblack-25 bg-richblack-700 focus:outline-none"
              />
              {errors.lastname && <span>Last name is required</span>}
            </div>
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="font-semibold text-blue-200">
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 rounded-md text-richblack-25 bg-richblack-700 focus:outline-none"
            />
            {errors.email && <span>Email address is required</span>}
          </div>

          {/*phone number */}
          <div>
            <label htmlFor="phoneNo" className="font-semibold text-blue-200">
              Contact *
            </label>
            <div className="flex items-center justify-center px-3 py-2 rounded-md text-richblack-25 bg-richblack-700">
              <div>
                <p className="font-semibold">+91</p>
              </div>
              <input
                type="phoneNo"
                name="phoneNo"
                id="phoneNo"
                placeholder="Mobile number"
                {...register("phoneNo", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
                className="w-full px-3 py-2 rounded-md text-richblack-25 bg-richblack-700 focus:outline-none"
              />
              {errors.phoneNo && errors.phoneNo.type === "required" && (
                <span className="text-red-500">Mobile number is required</span>
              )}
              {errors.phoneNo && errors.phoneNo.type === "minLength" && (
                <span className="text-red-500">
                  Mobile number must be at least 10 digits
                </span>
              )}
              {errors.phoneNo && errors.phoneNo.type === "maxLength" && (
                <span className="text-red-500">
                  Mobile number must not exceed 10 digits
                </span>
              )}
            </div>
          </div>

          <div>
            <textarea
              name="message"
              id="message"
              placeholder="Enter your text here...."
              {...register("message", { required: true })}
              className="w-full p-3 px-5 lg:h-44 rounded-md text-richblack-25 bg-richblack-700 focus:outline-none"
            ></textarea>
            {errors.message && <span>Message is required</span>}
          </div>
          {/* Add more fields as needed */}
        </div>
        <button
          type="submit"
          className="bg-yellow-5 text-black font-semibold w-full py-5 rounded mt-4 transition-all duration-700"
        >
          {loading ? "Sending..." : "Send Feeback"}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
