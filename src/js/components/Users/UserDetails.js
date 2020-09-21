import React from 'react';
import { Link } from 'react-router-dom';
function UserDetails({ user, permissions, match }) {
  return (
    <div>
      <div>
        <label htmlFor="name">Name:</label>
        <span id="name">{`${user.firstName} ${user.lastName}`}</span>
      </div>
      <div>
        <label htmlFor="username">User Name:</label>
        <span id="username">{`${user.userName}`}</span>
      </div>
      <div>
        <label htmlFor="timeout">Session time out (Minutes):</label>
        <span id="username">{`${user.sessionTimeOut}`}</span>
      </div>
      <div>
        <label htmlFor="created">Created Date:</label>
        <span id="username">11/12/1998</span>
      </div>
      <div>
        <label htmlFor="permissions">Permissions: {permissions.toString()}</label>
        <span id="username"></span>
      </div>
      <ul>
        <li>
          <Link to={`${match.url}/edit/${user.id}`}>
            <input type="button" value="Edit" />
          </Link>
        </li>
      </ul>
      <input type="button" value="Delete" onClick={() => { }} />
    </div>
  )
}

export default UserDetails