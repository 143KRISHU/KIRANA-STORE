import React, { useEffect, useState } from 'react'
import loginGif from "../assets/login-nobg.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Login() {
      const [showPassword, setShowPassword] = useState(false);
      const [formData, setFormData] = useState({
            email: "",
            password: ""
      });
      const [formErrors, setFormErrors] = useState({});
      const [isSubmit, setIsSubmit] = useState(false);

      const handleChnage = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
      }
      const handlingFormSubmit = (e) => {
            e.preventDefault();
            setFormErrors(validateFormData(formData));
            setIsSubmit(true);
      }

      const validateFormData = (values) => {
            const error = {};
            const regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            if (!values.email) { error.email = "Email is required" }
            if (!values.password) { error.password = "Password is required" }
            else if (values.password.length < 4) { error.password = "Password should be atleast of 4 character" }
            else if (values.password.length > 10) { error.password = "Password should not exceeds 10 character" }
            return error;
      }

      useEffect((() => {
            if (Object.keys(formErrors).length === 0 && isSubmit) {
                  console.log(formData)
            }
      }), [formErrors, formData])
      return (
            <section id='login'>
                  <div className='w-full flex justify-center mx-auto py-4 underline' style={{ fontSize: "42px" }}>
                        <h1>Login To Kirana-Store</h1>
                  </div>

                  <div className="container mx-auto p-4">
                        <div className='p-6 w-full max-w-xl mx-auto rounded-2xl shadow-2xl' style={{ backgroundColor: "#fff" }}>
                              <div className='h-20 w-20 mx-auto flex items-center mt-8 mb-4'>
                                    <img src={loginGif} alt='login-gif' />
                              </div>
                              <form className='gap-4' onSubmit={handlingFormSubmit}>
                                    <div className="grid credentials mt-8 mb-8 ">
                                          <label className="text-xl" htmlFor='email'>Email Id:&nbsp;&nbsp;  </label>
                                          <div className='bg-slate-100 p-2'>
                                                <input type='email' id='email' placeholder='Enter Your email'
                                                      className='w-full h-full outline-none bg-transparent' value={formData.email}
                                                      onChange={handleChnage} name='email' />
                                          </div>
                                          <p className='text-red-600 px-2'>{formErrors.email}</p>
                                    </div>

                                    <div className=" grid credentials mt-8 mb-8">
                                          <label className="text-xl" htmlFor='password'>Password:&nbsp; &nbsp;  </label>
                                          <div className='bg-slate-100 p-2 flex items-center'>
                                                <input type={showPassword ? 'text' : 'password'} id='password' placeholder='Enter Your Password'
                                                      className='w-full h-full outline-none bg-transparent' value={formData.password}
                                                      onChange={handleChnage} name='password' />
                                                <div onClick={() => setShowPassword((prevState) => !prevState)}
                                                      className='cursor-pointer text-xl'>
                                                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </div>
                                          </div>
                                          <p className='text-red-600 px-2'>{formErrors.password}</p>
                                          <Link to={"/forgotPassword"}>
                                                <p className='block w-fit ml-auto hover:text-blue-500 hover:underline'>
                                                      Forget Password ? </p>
                                          </Link>
                                    </div>
                                    <button className="credential-btn mt-8 mb-4 px-5 py-2 rounded-full w-full 
                                          max-w-[150px] hover:scale-110 transition-all text-lg block mx-auto"
                                          style={{ backgroundColor: "#ffddd2", border: "2px solid black" }} type='submit'>Login</button>
                              </form>
                              <p className='mt-5 text-sm w-full '>
                                    Don't have Account ? <Link to={"/signup"} className="hover:underline" style={{ color: "blue" }}>Sign-Up</Link>
                              </p>
                        </div>
                  </div>
            </section>
      )
}

export default Login
