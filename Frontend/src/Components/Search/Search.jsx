import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backendRoutesAPI from '../../BackendAPI/API'
import "./Search.css"
import SuggestionList from './SuggestionList'
function Search() {
  const [inputValue, setinputValue] = useState('')
  const [searchedResult, setsearchedResult] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { value } = event.target
    setinputValue(value)
  }

  const fetchingData = async () => {
    setLoading(true)
    const response = await fetch(backendRoutesAPI.searchProductFromBackend.url + `?q=${inputValue}`)
    const data = await response.json()
    if (data.success) {
      console.log(data.data)
      if (data.data.length > 0) {
        setsearchedResult(data.data)
        setLoading(false)
      }
      else if (data.data) {
        setsearchedResult([{ productName: 'No Result Found', _id: 0 }])
        setLoading(false)
      }
      else {
        setsearchedResult([])
      }
    }
    else {
      setError(data.message)
      setLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    console.log('entered')
    setinputValue(suggestion['productName'] !== 'No Result Found' ? suggestion['productName'] : '')
    setsearchedResult([])
    if(inputValue!==''){
      showProductPage(suggestion)    }
  }

  const showProductPage = (suggestion)=>{
    navigate(`/productDetail/${suggestion._id}/view`)
  }

  useEffect(() => {
    if (inputValue.length > 1) {
      fetchingData()
    }
    else {
      setsearchedResult([])
      setLoading(false)
    }
  }, [inputValue])


  return (
    <>
      <form className={`relative search`}
        style={{
          borderBottomLeftRadius: searchedResult.length > 0 && '0px',
          borderBottomRightRadius: searchedResult.length > 0 && '0px',
        }}
      >
        <div>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type='search' value={inputValue.toUpperCase()} className="search-bar "
            placeholder='Search For Product,Brand and More....'
            onChange={handleInputChange} />
        </div>
        {
          (searchedResult.length > 0 || loading || error)
          &&
          <ul className={`suggestionlist h-[300px] w-[522px] z-10 rounded-lg hidden-scrollbar 
                        overflow-y-scroll gap-2  py-2 top-[2.1rem] absolute bg-white 
                          ${searchedResult.length === 1 && 'h-fit'}`}>
            {loading && <div className='loading ml-9'>Loading.....</div>}
            {error && <div className='loading'>{error}</div>}
            <SuggestionList dataKey='productName' highlight={inputValue} suggestions={searchedResult}
              onSuggestionClick={handleSuggestionClick}
            />
          </ul>
        }

      </form>


    </>
  )
}

export default Search
