import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UsersManagementContext } from '../../Context/users-management-context'
export default function UserForm({ userDetails, actionText, onSubmit }) {

  if (!(userDetails instanceof Object)) {
    throw Error("UserForm must get userDetails prop which is an object instance")
  }
  var { usersManagementUrl } = useContext(UsersManagementContext)
  var data = getFieldsData(userDetails);
  return (
    <form onSubmit={onSubmit}>
      {renderFields(data.slice(0, 4))}
      <label>Permissions</label>
      {renderFields(data.slice(4))}
      <button type="submit">{actionText}</button>
      <Link to={`${usersManagementUrl}`}>
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

    { type: "checkbox", onChange: (() => null), label: "View Subscriptions:", checked: permissions ? permissions.viewSubscriptions : false, name: "viewSubscriptions" },
    { type: "checkbox", onChange: (() => null), label: "Create Subscriptions:", checked: permissions ? permissions.changeSubscriptions : false, name: "createSubscriptions" },
    { type: "checkbox", onChange: (() => null), label: "Delete Subscriptions:", checked: permissions ? permissions.createSubscriptions : false, name: "deleteSubscriptions" },
    { type: "checkbox", onChange: (() => null), label: "Update Subscriptions:", checked: permissions ? permissions.deleteSubscriptions : false, name: "updateSubscriptions" },

    { type: "checkbox", onChange: (() => null), label: "View Movies:", checked: permissions ? permissions.viewMovies : false, name: "viewMovies" },
    { type: "checkbox", onChange: (() => null), label: "Create Movies:", checked: permissions ? permissions.createMovies : false, name: "createMovies" },
    { type: "checkbox", onChange: (() => null), label: "Delete Movies:", checked: permissions ? permissions.deleteMovies : false, name: "deleteMovies" },
    { type: "checkbox", onChange: (() => null), label: "Update Movies:", checked: permissions ? permissions.updateMovies : false, name: "updateMovies" }
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