import React from 'react'

export function FilterPieByFlavor(props) {
    return(
        <div>
        <h4>Filter By Sweet or Savory:</h4>
         <select defaultValue={'none'} className='filter' /*onChange={props.change}*/ name='filter-sweet-savory'>
            <option value='none'>None</option>
            <option value="sweet">Sweet</option>
            <option value="savory">Savory</option>
         </select>
        </div>
        )
}