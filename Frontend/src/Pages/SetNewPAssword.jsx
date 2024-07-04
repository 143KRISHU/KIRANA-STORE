import React, { useState ,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import backendRoutesAPI from '../BackendAPI/API';
import { toast } from 'react-toastify';

function SetNewPAssword() {
  const params = useParams()
  const currentCustID = params.id
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPasswordFormData({ ...passwordFormData, [name]: value })
  }

  const validate = (values) => {
    const errors = {};
    const isStrongPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/

    if (!values.password) { errors.password = 'Password is required' }
    else if (!isStrongPassword.test(values.password)) { errors.password = 'Password must contain at least one each of [Digit, Uppercase Letter, lowercase letter, and non-alphanumeric] and length of password should be of 8 character' }
    else if (values.password.length < 4) { errors.password = "Password should be atleast of 4 character" }
    else if (values.password.length > 10) { errors.password = "Password should not exceeds 10 character" }

    if (!values.confirmPassword) { errors.confirmPassword = 'Confirm Password is required' }
    else if (values.confirmPassword.length < 4) { errors.confirmPassword = "Confirm Password  should be atleast of 4 character" }
    else if (values.confirmPassword.length > 10) { errors.confirmPassword = "Confirm Password  should not exceeds 10 character" }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Confirm Password and Password should be Same'
      errors.confirmPassword = 'Confirm Password and Password should be Same'
    }
    return errors
  }
  
  const handleFormSubmit = async(e)=>{
    e.preventDefault()
    setFormError(validate(passwordFormData));
    setIsSubmit(true);
  }

  const updateThePasswordInDatabase = async()=>{
    const dataToSend = {...passwordFormData ,customerId:currentCustID}
    console.log(dataToSend)
    const backendResponse = await fetch(backendRoutesAPI.updatePassword.url,{
      method: backendRoutesAPI.updatePassword.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    })
    const finalRes = await backendResponse.json()
    if(finalRes.success){
      toast.success(finalRes.message)
      navigate('/login')
    }
    else{
      toast.error(`${finalRes.message},Try After Sometime`)
      navigate('/login')
    }
  }

  useEffect(()=>{
    if(Object.keys(formError).length === 0 && isSubmit){
      updateThePasswordInDatabase()
    }
  },[formError])
  return (
    <div className='px-5 py-12'>
      <div className='w-full p-6  mx-auto max-w-[50%] bg-white rounded-xl shadow-xl'>
        <form className='flex flex-col p-4 gap-4'>
          <div className='flex flex-col gap-3 '>
            <label htmlFor="newpassword" className='font-semibold text-2xl'>Enter New Password</label>
            <div className='bg-slate-200 p-2 gap-2 flex items-center rounded-sm'>
              <input type={showPassword ? 'text' : 'password'} name='password' id='newpassword' value={passwordFormData.password} onChange={handleInputChange}
                className=' rounded-sm p-2 w-full text-xl' />
              <div onClick={() => setShowPassword((prevState) => !prevState)}
                className='cursor-pointer text-2xl'>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <p className='text-red-600 font-bold text-lg px-2 capitalize'>{formError.password}</p>
          </div>
          <div className='flex flex-col gap-3 '>
            <label htmlFor="confirmNewPassword" className='font-semibold text-2xl'>Confirm New Password</label>
            <div className='bg-slate-200 p-2 gap-2 flex items-center rounded-sm'>
              <input type={showConfirmPassword ? 'text' : 'password'} name='confirmPassword' id='confirmNewPassword' value={passwordFormData.confirmPassword} onChange={handleInputChange}
                className=' rounded-sm p-2 w-full text-xl' />
              <div onClick={() => setShowConfirmPassword((prevState) => !prevState)}
                className='cursor-pointer text-2xl'>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <p className='text-red-600 font-bold capitalize text-lg px-2'>{formError.confirmPassword}</p>
          </div>
          <button className='border-2 text-lg font-semibold hover:bg-[#006D77] hover:text-white 
              border-[#006D77] mx-auto px-4 py-2 rounded-xl' onClick={handleFormSubmit}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  )
}

export default SetNewPAssword
