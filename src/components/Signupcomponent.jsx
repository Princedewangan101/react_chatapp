import React from 'react'
import { useForm } from "react-hook-form"

const Signupcomponent = ({ switchToLogin }) => {

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

        <h2 className="text-4xl mb-5 font-bold  text-gray-800">Sign Up</h2>

        {/* Username */}
        <div>
          <input
            placeholder="Username"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm hover:bg-slate-700/15 "
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
            })}
          />
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
          )}
        </div>

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

        {/* Age */}
        <div>
          <input
            type="number"
            placeholder="Age"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
              min: { value: 13, message: "Minimum age is 13" },
              max: { value: 120, message: "Invalid age" },
            })}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm hover:bg-slate-700/15 "
          />
          {errors.age && (
            <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full cursor-pointer rounded-lg border border-gray-300 p-2 text-sm hover:bg-slate-700/15 "
          >

            <option value="" className=' bg-[#0a0a0a] text-sm'>Select gender...</option>
            <option value="male" className='bg-[#0a0a0a] text-sm' >Male</option>
            <option value="female" className='bg-[#0a0a0a] text-sm' >Female</option>
            <option value="other" className='bg-[#0a0a0a] text-sm' >Other</option>

          </select>
          {errors.gender && (
            <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center space-x-2 my-3">
          <input
            type="checkbox"
            {...register("terms", { required: "You must accept terms" })}
            className="h-4 w-4 text-violet-600 focus:ring-voilet-500 border-violet-300 rounded"
          />
          <span className="text-xs text-gray-700">I accept the terms</span>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
        )}

        {/* Submit */}
        <div className='flex justify-center my-4'>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[50%] border border-violet-700  py-1 font-bold rounded-md hover:bg-violet-700 "
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>

        </div>
        <div className='text-xs text-center'>
          <p>Alredy have an account ?
            <a onClick={switchToLogin} className='text-violet-600 font-semibold hover:underline cursor-default'>Login here</a>
          </p>
        </div>
      </div>
    </form>

  )
}

export default Signupcomponent
