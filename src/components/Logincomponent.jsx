import React from 'react'
import { useForm } from "react-hook-form"

const Logincomponent = ({ switchToSignup }) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("✅ Sign up successful (check console for data)");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" shadow-sm rounded-xl w-1/3 m-auto " >
      <div className='space-y-1 w-3/5 m-auto my-6'>

        <h2 className="text-4xl mb-5 font-bold  text-gray-800">Login</h2>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm hover:bg-slate-700/15 "
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
            })}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm hover:bg-slate-700/15 "
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>


        {/* Submit */}
        <div className='flex justify-center my-4'>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[50%] border border-violet-700  py-1 font-bold rounded-md hover:bg-violet-700 "
          >
            {isSubmitting ? "in Process" : "Login"}
          </button>

        </div>
        <div className='text-xs text-center'>
          <p>Create new account ? 
            <a onClick={switchToSignup}   className='text-violet-600 font-semibold hover:underline cursor-default'>Sign up</a>
          </p>
        </div>
      </div>
    </form>

  )
}

export default Logincomponent
