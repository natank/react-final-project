import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MembersManagementContext } from '../../Context/members-management-context';
import { MainContext } from '../../Context/main-context';

export default function MemberDetails({ member, match }) {
  const { membersManagementUrl } = useContext(MembersManagementContext)
  return (
    <div>
      <h3>{member.name}</h3>
      <p>{`Email: ${member.email}`}</p>
      <Link to={`${match.url}/edit/${member.id}`}>
        <input type="button" value="Edit" onClick={() => { }} />
      </Link>
      <input type="button" value="Delete" onClick={() => { }} />
      <div>
        <h3>Movies Watched</h3>
        <p>Subscribe to new movie</p>
        <p style={{ color: "red" }}>TODO: Movie list:</p>
      </div>
    </div>
  )
}