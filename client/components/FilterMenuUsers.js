import React from 'react';

export function FilterMenuUsers(props) {
  return (
    <div className='filter'>
      <select
        defaultValue='id'
        /*onChange={props.change}*/
      >
        <option value='id'>Sort by: User ID</option>
        <option value='admin'>Sort by: Admin</option>
        <option value='user'>Sort by: User</option>
      </select>
    </div>
  );
}
