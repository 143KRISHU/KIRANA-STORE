import React, { useEffect, useState } from 'react'
import backendRoutesAPI from '../../BackendAPI/API'
import "./Search.css"
function Search() {
      const [inputValue, setinputValue] = useState('')
      const handleInputChange =(event)=>{
            const {value} = event.target
            setinputValue(value)
      }
      const fetchingData = async()=>{
            const response = await fetch(backendRoutesAPI.searchProductFromBackend.url +`?q=${inputValue}`)
            const data = await response.json()
            console.log('Response',data)
      }
      useEffect(()=>{
            if(inputValue.length > 2){
                  fetchingData()
            }
      },[inputValue])
      return (
            <>
                  <form className='search'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type='search' value={inputValue.toUpperCase()} className="search-bar " placeholder='Search For Product,Brand and More....' 
                              onChange={handleInputChange} />
                  </form>
            </>
      )
}

export default Search
