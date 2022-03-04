import React from 'react';

export function FilterMenu(props) {
  return (
    <div className='filter'>
      <select
        defaultValue='alphabetical'
        /*onChange={props.change}*/
      >
        <option value='alphabetical'>Sort by: Alphabetical</option>
        <option value='sweet'>Sort by: Sweet</option>
        <option value='savory'>Sort by: Savory</option>
      </select>
    </div>
  );
}
