import React from 'react'
import { useState } from 'react'

const SearchBar = ({onSearch}) => {

  const [ queryInput, setQueryResults ] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(queryInput)
      setQueryResults('')
    };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input name="text" value={queryInput} onChange={(e) => setQueryResults(e.target.value)} />
        </form>
      </div>
    </div>
  );
}

export default SearchBar