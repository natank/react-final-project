import React, { useContext } from 'react';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';

const UserDetails = () => {
  const match = useRouteMatch();
  const context = useContext(UserContext)
  const history = useHistory();
  console.log(`user match.url = ${context.editUrl}`);
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
      <ul>
        <li><Link to={context.editUrl}>Edit</Link></li>
      </ul>
      <input type="button" value="Edit" onClick={() => { history.push(context.editUrl) }} />
      <input type="button" value="Delete" onClick={() => { }} />
    </div>
  )
}

export default UserDetails