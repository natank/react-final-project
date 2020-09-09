import React from 'react';
import {useRouteMatch} from 'react-router-dom';

const UserDetails = () => {
  const match = useRouteMatch();
  console.log(`user match.url = ${match.url}`);
  return (
    <div>
      <div>
        <label htmlFor="name">Name:</label>
        <span id="name">Avi Cohen</span>
      </div>
      <div>
        <label htmlFor="username">User Name:</label>
        <span id="username">avi@gmail.com</span>
      </div>
      <div>
        <label htmlFor="timeout">Session time out (Minutes):</label>
        <span id="username">44</span>
      </div>
      <div>
        <label htmlFor="created">Created Date:</label>
        <span id="username">11/12/1998</span>
      </div>
      <div>
        <label htmlFor="permissions">Permissions:</label>
        <span id="username">View Subscriptions, Edit Movies</span>
      </div>

      <input type="button" value="Edit" onClick={()=>{}} />
      <input type="button" value="Delete" onClick={()=>{}} />
    </div>
  )
}

export default UserDetails