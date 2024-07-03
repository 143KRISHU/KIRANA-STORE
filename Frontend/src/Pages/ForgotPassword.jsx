import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import backendRoutesAPI from '../BackendAPI/API'

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: ''
  })
  const [otpFormData, setOtpFormData] = useState({
    otp: ''
  })
  const [otpSentFlag, setOtpSentFlag] = useState(false)
  const [validCustomerId, setvalidCustomerId] = useState({
    customerId: ''
  })
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleOtpInputChange = (e) => {
    const { name, value } = e.target
    setOtpFormData({ ...otpFormData, [name]: value })
  }

  const handleCheckEmail = async (e) => {
    e.preventDefault()
    if (formData.email === '') {
      toast.error('Enter the Registered Email')
    }
    else {
      const backendResponse = await fetch(backendRoutesAPI.forgotPassword.url, {
        method: backendRoutesAPI.forgotPassword.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const finalRes = await backendResponse.json()
      if (finalRes.success) {
        setvalidCustomerId({ ...validCustomerId, customerId: finalRes.data.id })
        toast.success(finalRes.message)
        setOtpSentFlag(true)
      }
      else {
        toast.error(finalRes.message)
        setFormData({ email: ''})
      }
    }
  }

  const handleOTPVErification = async (e) => {
    e.preventDefault()
    const _id = validCustomerId.customerId
    if(otpFormData.otp === ''){
      toast.error("Enter the 6 digit Otp sent to your Email ")
    }
    else if (otpFormData.otp.length > 6) {
      toast.error('Otp Should not be Exceed 6 digit')
    }
    else if (otpFormData.otp.length < 6) {
      toast.error('Otp Should not be less than 6 digit')
    }
    else {
      const backendResponse = await fetch(backendRoutesAPI.verifyOtp.url, {
        method: backendRoutesAPI.verifyOtp.method,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ otp: otpFormData.otp, customerId: _id })
      })
      const finalRes = await backendResponse.json()
      if(finalRes.success){
        toast.success(finalRes.message)
        navigate(`/resetpassword/${finalRes.data._id}`)
      }
      else{
        toast.error(finalRes.message)
      }
    }
  }

  return (
    <div className='p-8 flex justify-center items-center'>
      <div className='bg-white p-6 text-lg w-full mx-auto max-w-xl rounded-lg shadow-lg'>
        <form className='flex flex-col gap-4  p-3' >
          <div className='grid gap-10 forgotPasswordForm' >
            <label htmlFor='email' className='md:text-2xl text-lg select-none'>Enter Your Registered Email </label>
            <input type='email' id='email' name='email' placeholder='example@gamil.com' value={formData.email} onChange={handleOnChange}
              className='md:text-xl text-md p-2 bg-slate-200 text text-black' disabled={otpSentFlag ? true : false} />
            <button className='border-2 border-[#006D77] max-w-lg rounded-xl transition-colors
                    mx-auto px-4 py-2 hover:text-white hover:bg-[#006D77] text-xl' onClick={handleCheckEmail}
              disabled={otpSentFlag ? true : false}>
              Check
            </button>
          </div>
        </form>

        {/* OTP VERIFICATION SECTION */}

        {
          otpSentFlag ? (
            <>
              <form className='flex flex-col mt-4 border-2 gap-2 p-3 border-[black]'>
                <h3 className='md:text-2xl text-lg select-none'>Enter the Otp : </h3>
                <div className='flex justify-evenly items-center'>
                  <input type='number' placeholder='6 Digit OTP' name='otp' value={otpFormData.otp} onChange={handleOtpInputChange}
                    className='md:text-xl text-md p-2 bg-slate-100 text text-red-600 font-bold text-center'
                  />
                  <button className='border-2 text-white bg-red-500 max-w-lg rounded-xl px-4 hover:scale-x-105 font-semibold py-2 transition-all text-xl'
                    onClick={handleOTPVErification}>
                    Verify
                  </button>
                </div>
              </form>
            </>
          ) : null
        }
      </div>

    </div>
  )
}

export default ForgotPassword
