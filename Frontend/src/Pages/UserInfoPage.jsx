import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import backendRoutesAPI from '../BackendAPI/API';
import { setCustomerDetail } from '../Store/customerSlice';

const theme = createTheme({
      components: {
            MuiTextField: {
                  styleOverrides: {
                        root: {
                              '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                          borderColor: '#83C5BE', // Default border color
                                    },
                                    '&:hover fieldset': {
                                          borderColor: '#83C5BE', // Border color on hover
                                    },
                                    '&.Mui-focused fieldset': {
                                          borderColor: '#006D77', // Border color when focused
                                    },
                              },
                              '& .MuiInputLabel-root': {
                                    color: '#006D77', // Label color
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#006D77', // Label color when focused
                              },
                        },
                  },
            },
      },
});

function UserInfoPage() {
      const user = useSelector((state) => state?.customer?.customer)
      const dispatch = useDispatch()
      const [updatingPersonalInfo, setUpdatingPersonalInfo] = useState(false)
      const [updatingEmailAddress, setUpdatingEmailAddress] = useState(false)
      const [updatingMobileNumber, setUpdatingMobileNumber] = useState(false)
      const [isUpdating, setIsUpdating] = useState(false)
      const [userData, setUserData] = useState(user)
      const handleChange = (e) => {
            const { name, value } = e.target
            setUserData({ ...userData, [name]: value })
      }
      const updateInfo = async () => {
            setIsUpdating(true)
            const dataToUpdate = {}
            if (userData.firstName.toLowerCase() !== user.firstName.toLowerCase()) {
                  if (userData.firstName !== '') {
                        dataToUpdate.firstName = userData.firstName.toLowerCase()
                  }
                  else {
                        toast.warning("First Name Can't be empty")
                        setIsUpdating(false)
                        setUserData(user)
                  }
            }
            if (userData.middleName.toLowerCase() !== user.middleName.toLowerCase()) {
                  dataToUpdate.middleName = userData.middleName.toLowerCase()
            }
            if (userData.lastName.toLowerCase() !== user.lastName.toLowerCase()) {
                  if (userData.lastName !== '') {
                        dataToUpdate.lastName = userData.lastName.toLowerCase()
                  }
                  else {
                        toast.warning("Last Name Can't be empty")
                        setIsUpdating(false)
                        setUserData(user)
                  }
            }
            if (Object.keys(dataToUpdate).length > 0) {
                  updateUserDetail(dataToUpdate)
            } else {
                  toast.warning('No Updation Made')
                  setUpdatingEmailAddress(false)
                  setUpdatingPersonalInfo(false)
                  setIsUpdating(false)
            }
      }
      const updateUserDetail = async (data) => {
            //console.log('Time Api Called',new Date(Date.now()).toLocaleString())
            const backendAPIResponse = await fetch(backendRoutesAPI.customerUpdateInfo.url,{
                  method:backendRoutesAPI.customerUpdateInfo.method,
                  credentials:'include',
                  headers: {
                        'content-type': 'application/json'
                  },
                  body:JSON.stringify(data)
            })
            const finalRes = await backendAPIResponse.json()
            if(finalRes.success){
                  //console.log('Time Response Recieved',new Date(Date.now()).toLocaleString())
                  toast.success(finalRes.message)
                  dispatch(setCustomerDetail(finalRes.data))
                  setIsUpdating(false)
                  setUpdatingPersonalInfo(false)
                  setUpdatingEmailAddress(false)
            }
            else{
                  toast.error(finalRes.message)
            }
      }
      useEffect(() => {
            setUserData(user)
      }, [user])
      return (
            <div className='flex p-4 w-full'>
                  <div className='flex w-full bg-[#fff] rounded-sm'>
                        <div className=' w-full flex gap-6 flex-col items-baseline p-4'>
                              {/* Personal Information */}
                              <div className='w-full flex flex-col gap-3 p-2'>
                                    <div className='flex items-baseline gap-8 w-full '>
                                          <h1 className='text-2xl'>Personal Information</h1>
                                          <span className='text-sm font-semibold  cursor-pointer text-blue-600'
                                                onClick={() => {
                                                      if(!isUpdating){
                                                            setUserData(user)
                                                      }
                                                      return setUpdatingPersonalInfo((prevOption) => !prevOption)
                                                }
                                                }
                                          >
                                                {updatingPersonalInfo ? 'Cancel' : 'Edit'}
                                          </span>
                                    </div>
                                    {
                                          isUpdating ? <h1 className='text-3xl font-bold'>Upating....</h1>:<div className='flex gap-3'>
                                          <Box
                                                component="form"
                                                sx={{
                                                      '& > :not(style)': { m: 1, width: '25ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                          >
                                                <ThemeProvider theme={theme}>
                                                      <TextField
                                                            id={updatingPersonalInfo ? "outlined-basic" : "outlined-basic-disabled"}
                                                            label={updatingPersonalInfo ? "First Name" : ""}
                                                            variant="outlined"
                                                            value={userData?.firstName !== undefined ? userData?.firstName.toUpperCase() : ''}
                                                            disabled={updatingPersonalInfo ? false : true}
                                                            name='firstName'
                                                            onChange={handleChange}
                                                      />
                                                      {
                                                            userData?.middleName !== '' && userData?.middleName !== undefined ? (
                                                                  <TextField
                                                                        id={updatingPersonalInfo ? "outlined-basic" : "outlined-basic-disabled"}
                                                                        label={updatingPersonalInfo ? "Middle Name" : ""}
                                                                        variant="outlined"
                                                                        value={userData?.middleName !== undefined ? userData?.middleName.toUpperCase() : ''}
                                                                        disabled={updatingPersonalInfo ? false : true}
                                                                        name='middleName'
                                                                        onChange={handleChange}
                                                                  />
                                                            ) : null
                                                      }
                                                      <TextField
                                                            id={updatingPersonalInfo ? "outlined-basic" : "outlined-basic-disabled"}
                                                            label={updatingPersonalInfo ? "Last Name" : ""}
                                                            variant="outlined"
                                                            value={userData?.lastName !== undefined ? userData?.lastName.toUpperCase() : ''}
                                                            disabled={updatingPersonalInfo ? false : true}
                                                            name='lastName'
                                                            onChange={handleChange}
                                                      />
                                                </ThemeProvider>
                                                {updatingPersonalInfo ? <Button id='formsavebtn' variant="contained" onClick={() => { updateInfo() }}>SAVE</Button> : null}
                                          </Box>
                                    </div>
                                    }
                                    
                              </div>
                              {/* Email Address */}
                              <div className='w-full flex flex-col gap-3 p-2'>
                                    <div className='flex items-baseline w-full gap-8'>
                                          <h1 className='text-2xl'>Email Address</h1>
                                          <span className='text-sm font-semibold cursor-pointer text-blue-500' 
                                                onClick={() => {
                                                      if(!isUpdating){
                                                            setUserData(user)
                                                      }
                                                      return setUpdatingEmailAddress((prevOption) => !prevOption)
                                                }}
                                          >
                                                {updatingEmailAddress ? 'Cancel' : 'Edit'}
                                          </span>
                                    </div>
                                    <div className='flex gap-3'>
                                          <Box
                                                component="form"
                                                sx={{
                                                      '& > :not(style)': { m: 1, width: '45ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                          >
                                                <ThemeProvider theme={theme}>
                                                      <TextField
                                                            id={updatingEmailAddress ? "outlined-basic" : "outlined-basic-disabled"}
                                                            label={updatingEmailAddress ? "Email Address" : ""}
                                                            variant="outlined"
                                                            value={userData?.email !== undefined ? userData.email : ''}
                                                            disabled={updatingEmailAddress ? false : true}
                                                            name='email'
                                                            onChange={handleChange}
                                                            type='email'
                                                      />
                                                </ThemeProvider>
                                                {updatingEmailAddress ? <Button id='formsavebtn' variant="contained">SAVE</Button> : null}
                                          </Box>
                                    </div>
                              </div>
                              {/* Mobile Number */}
                              <div className='w-full flex flex-col gap-3 p-2'>
                              <div className='flex items-baseline w-full gap-8'>
                                          <h1 className='text-2xl'>Mobile Number</h1>
                                          <span className='text-sm font-semibold cursor-pointer text-blue-500' 
                                                onClick={() => {
                                                      if(!isUpdating){
                                                            setUserData(user)
                                                      }
                                                      return setUpdatingMobileNumber((prevOption) => !prevOption)
                                                }}
                                          >
                                                {updatingMobileNumber ? 'Cancel' : 'Edit'}
                                          </span>
                                    </div>
                                    <div className='flex gap-3'>
                                          <Box
                                                component="form"
                                                sx={{
                                                      '& > :not(style)': { m: 1, width: '25ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                          >
                                                <ThemeProvider theme={theme}>
                                                      <TextField
                                                            id={updatingMobileNumber ? "outlined-basic" : "outlined-basic-disabled"}
                                                            label={updatingMobileNumber ? "Mobile Number" : ""}
                                                            variant="outlined"
                                                            defaultValue='+919140626611'
                                                            disabled={updatingMobileNumber ? false : true}
                                                      />
                                                </ThemeProvider>
                                                {updatingMobileNumber ? <Button id='formsavebtn' variant="contained">SAVE</Button> : null}
                                          </Box>
                                    </div>
                              </div>

                        </div>
                  </div>
            </div>
      )
}

export default UserInfoPage
