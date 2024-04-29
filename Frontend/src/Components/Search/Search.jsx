import React from 'react'
import "./Search.css"
function Search({value}) {
      return (
            <>
                  <form className='search'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type='search' className="search-bar" placeholder='Search The Product' />
                  </form>
            </>
      )
}

export default Search
