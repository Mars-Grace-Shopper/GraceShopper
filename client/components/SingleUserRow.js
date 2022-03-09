import React from 'react';
import { Link } from 'react-router-dom';

export default function SingleUserRow(props) {
  const user = props.user;

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        <select defaultValue={user.type} name='type'>
          <option value='user'>User</option>
          <option value='admin'>Admin</option>
        </select>
      </td>
    </tr>
  );
}
