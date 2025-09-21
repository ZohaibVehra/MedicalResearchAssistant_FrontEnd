import { useState } from "react"


const SearchBar = ({ handleSearch }) => {

  const [ rawQuery, setRawQuery ] = useState('')

  const performSearch = event =>  {
    event.preventDefault()
    const queryObj = { rawQuery, freeOnly: false }
    handleSearch(queryObj)
    setRawQuery('')
  }

  return(
    <div>
      <h2>Search</h2>
      <form onSubmit={performSearch}>
        <label>Search
          <input placeholder="patellar tendonitis" value={rawQuery} onChange={event => setRawQuery(event.target.value)}/>
        </label>
        <button type="submit">logo</button>
      </form>
    </div>
  )

}

export default SearchBar