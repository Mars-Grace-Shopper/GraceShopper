import React from 'react';

export function FilterMenuUsers(props) {
  return (
    <div className='filter'>
      <select
        defaultValue='alphabetical'
        /*onChange={props.change}*/
      >
        <option value='alphabetical'>Sort by: Alphabetical</option>
        <option value='admin'>Sort by: Admin</option>
        <option value='user'>Sort by: User</option>
      </select>
    </div>
  );
}
