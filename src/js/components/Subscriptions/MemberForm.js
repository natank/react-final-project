import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MembersManagementContext } from '../../Context/members-management-context'
export default function MemberForm({ memberDetails, actionText, onSubmit }) {

  if (!(memberDetails instanceof Object)) {
    throw Error("MemberForm must get memberDetails prop which is an object instance")
  }
  var { membersManagementUrl } = useContext(MembersManagementContext)
  var data = getFieldsData(memberDetails);
  return (
    <form onSubmit={onSubmit}>
      <label>Name:<input type="text" value={memberDetails.name ? memberDetails.name : ""} onChange={() => { }} /></label><br />
      <label>Email:<input type="text" value={memberDetails.email ? memberDetails.email : ""} onChange={() => { }} /></label><br />
      <label>City:<input type="text" value={memberDetails.city ? memberDetails.city : ""} onChange={() => { }} /></label><br />

      <button type="submit">{actionText}</button>
      <Link to={`${membersManagementUrl}`}>
        <button type="button">Cancel</button>
      </Link>

    </form>
  )

}


function getFieldsData(userDetails) {
  const { firstName, lastName, userName, sessionTimeOut, createdDate, permissions } = userDetails;
  return [
    { type: "text", onChange: (() => null), label: "First Name:", name: "firstName", value: firstName || "" },
    { type: "text", onChange: (() => null), label: "Last Name:", name: "lastName", value: lastName || "" },
    { type: "text", onChange: (() => null), label: "User Name:", name: "userName", value: userName || "" },
    { type: "text", onChange: (() => null), label: "Session Timeout:", name: "sessionTimeout", value: sessionTimeOut || "" },
    { type: "fixed", onChange: (() => null), label: "Created date:", name: "Created", value: createdDate || "" },

    { type: "checkbox", onChange: (() => null), label: "View Members:", checked: permissions ? permissions.viewMembers : false, name: "viewMembers" },
    { type: "checkbox", onChange: (() => null), label: "Create Members:", checked: permissions ? permissions.changeMembers : false, name: "createMembers" },
    { type: "checkbox", onChange: (() => null), label: "Delete Members:", checked: permissions ? permissions.createMembers : false, name: "deleteMembers" },
    { type: "checkbox", onChange: (() => null), label: "Update Members:", checked: permissions ? permissions.deleteMembers : false, name: "updateMembers" },

    { type: "checkbox", onChange: (() => null), label: "View Members:", checked: permissions ? permissions.viewMembers : false, name: "viewMembers" },
    { type: "checkbox", onChange: (() => null), label: "Create Members:", checked: permissions ? permissions.createMembers : false, name: "createMembers" },
    { type: "checkbox", onChange: (() => null), label: "Delete Members:", checked: permissions ? permissions.deleteMembers : false, name: "deleteMembers" },
    { type: "checkbox", onChange: (() => null), label: "Update Members:", checked: permissions ? permissions.updateMembers : false, name: "updateMembers" }
  ]
}

function renderFields(fields) {
  return fields.map(function renderField({ label, type, value, onChange, name, checked }) {
    switch (type) {
      case "text":
        return (
          <label style={{ display: "block" }} key={name}>
            {label}
            <input type={type} value={value} onChange={onChange} />
          </label>
        )
      case "checkbox":
        return (
          <label style={{ display: "block" }} key={name}>
            {label}
            <input name={name}
              type={type}
              checked={checked}
              onChange={onChange} />
          </label>
        )
      default:
        return null;
    }
  })
}