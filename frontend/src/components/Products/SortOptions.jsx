import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOptions = () => {

  const [searchParams,setSearchParams]=useSearchParams();

  const handleSortChange=(e)=>{
    const sortBy=e.target.value;
    searchParams.set("sortBy",sortBy);
    setSearchParams(searchParams);
  }

  return (
    <div className='mb-4 flex items-center justify-end'>
      <select 
      id='sort' 
      onChange={handleSortChange}
      value={searchParams.get("sortBy")||""}
      className='border p-2 rounded focus:outline-none'>
        <option>Default</option>
        <option value='priceAsc'>Price: Low to High</option>
        <option value='priceDesc'>Price: High toLow</option>
        <option value='popularity'>Popularity</option>
      </select>
      {/* SortOptions */}
    </div>
  )
}

export default SortOptions
