import React from 'react';

const UserDetails = () => {
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
    </div>
  )
}

export default UserDetails