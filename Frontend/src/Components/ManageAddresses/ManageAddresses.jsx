import { createTheme, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, ThemeProvider } from '@mui/material';
import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi";

const theme = createTheme({
      components: {
            MuiTextField: {
                  styleOverrides: {
                        root: {
                              '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                          borderColor: 'black', // Default border color
                                    },
                                    '&:hover fieldset': {
                                          borderColor: '#006D77', // Border color on hover
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

const themeforRadioButton = createTheme({
      components: {
            MuiRadio: {
                  styleOverrides: {
                        root: {
                              color: 'defaultColor', // Default color
                        },
                  },
            },
      },
      palette: {
            primary: {
                  main: '#006D77', // Change the primary color
            }
      },
});

function ManageAddresses() {
      const [addingNewAddress, setAddingNewAddress] = useState(false)
      return (
            <div className=' w-full flex gap-4 flex-col items-baseline p-4'>
                  <div className='flex flex-col gap-4 w-full'>
                        <div className='flex items-baseline gap-8 w-full '>
                              <h1 className='text-3xl font-semibold'>Manage Addresses</h1>
                        </div>
                        <div className='flex w-full px-4'>
                              <div className='w-full gap-4 flex flex-col px-6 py-3'>
                                    <div className='border border-slate-500 flex px-4 py-3' style={{ backgroundColor: addingNewAddress ? "#9fded775" : "#fff" }}>
                                          {
                                                addingNewAddress
                                                      ?
                                                      <div className='flex flex-col gap-8'>
                                                            <div className='flex'>
                                                                  <h1 className='flex text-xl font-semibold gap-4 text-[#006D77]
                                                                  items-center group cursor-pointer' onClick={() => { setAddingNewAddress(true) }}>
                                                                        Add New Address
                                                                  </h1>
                                                            </div>
                                                            <form className='w-full grid-cols-2  gap-3 lg:grid flex flex-col px-2'>
                                                                  <ThemeProvider theme={theme}>
                                                                        <TextField
                                                                              id="outlined-basic"
                                                                              label="Name"
                                                                              variant="outlined"
                                                                              type='text'
                                                                        />
                                                                        <TextField
                                                                              id="outlined-basic"
                                                                              label="10-digit mobile number"
                                                                              variant="outlined"
                                                                              type='number'
                                                                        />
                                                                        <TextField
                                                                              id="outlined-basic"
                                                                              label="Pincode"
                                                                              variant="outlined"
                                                                              type='number'
                                                                        />
                                                                        <TextField
                                                                              id="outlined-basic"
                                                                              label="Locality"
                                                                              variant="outlined"
                                                                              type='text'
                                                                        />
                                                                        <TextField
                                                                              id="outlined-basic"
                                                                              label="Address (Area & Street)"
                                                                              variant="outlined"
                                                                              type='text'
                                                                              className='col-span-2 bg-white'
                                                                              multiline
                                                                              rows={4}
                                                                        />
                                                                        <TextField
                                                                              id="outlined-basic"
                                                                              label="City/District/Town"
                                                                              variant="outlined"
                                                                              type='text'
                                                                        />
                                                                        <TextField
                                                                              id="outlined-basic"
                                                                              label="State"
                                                                              variant="outlined"
                                                                              type='text'
                                                                        />
                                                                        <TextField
                                                                              id="outlined-basic"
                                                                              label="Landmark (optional)"
                                                                              variant="outlined"
                                                                              type='text'
                                                                        />
                                                                        <TextField
                                                                              id="outlined-basic"
                                                                              label="Alternate Phone (Optional)"
                                                                              variant="outlined"
                                                                              type='text'
                                                                        />
                                                                  </ThemeProvider>
                                                                  <ThemeProvider theme={themeforRadioButton}>
                                                                        <FormControl className='gap-2 mt-2'>
                                                                              <FormLabel id="demo-controlled-radio-buttons-group">Address Type</FormLabel>
                                                                              <RadioGroup
                                                                                    row
                                                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                                                    name="controlled-radio-buttons-group"
                                                                                    className='flex'
                                                                              >
                                                                                    <FormControlLabel value="home" control={<Radio/>} label="Home" />
                                                                                    <FormControlLabel value="office" control={<Radio />} label="Office" />
                                                                              </RadioGroup>
                                                                        </FormControl>
                                                                  </ThemeProvider>

                                                            </form>
                                                      </div>
                                                      :
                                                      <div className='flex'>
                                                            <h1 className='flex text-xl font-semibold gap-4 text-blue-600
                                                             items-center group cursor-pointer' onClick={() => { setAddingNewAddress(true) }}>
                                                                  {addingNewAddress ? null : <span><FiPlus /></span>}
                                                                  Add New Address
                                                            </h1>
                                                      </div>
                                          }
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default ManageAddresses
