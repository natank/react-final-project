import React, { useContext } from 'react';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import { UsersManagementContext } from '../Context/users-management-context';


const UserDetails = ({user}) => {

  const context = useContext(UsersManagementContext)
  const history = useHistory();

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