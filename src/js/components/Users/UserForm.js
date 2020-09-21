import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UsersManagementContext } from '../../Context/users-management-context'
export default function UserForm({ userDetails, permissionsDetails, actionText, onSubmit }) {
  var { firstName, lastName, userName, sessionTimeOut, createdDate } = userDetails;
  var [firstName, setFirstName] = useState(firstName)
  var [lastName, setLastName] = useState(lastName)
  var [userName, setUserName] = useState(userName)
  var [sessionTimeOut, setSessionTimeOut] = useState(sessionTimeOut)
  var editedUserId = userDetails.id


  var { permissions } = permissionsDetails
  var { subscriptions, movies } = permissions;
  var [viewSubscriptions, setViewSubscriptions] = useState(subscriptions.view);
  var [createSubscriptions, setCreateSubscriptions] = useState(subscriptions.create);
  var [deleteSubscriptions, setDeleteSubscriptions] = useState(subscriptions.delete);
  var [updateSubscriptions, setUpdateSubscriptions] = useState(subscriptions.edit);
  var [viewMovies, setViewMovies] = useState(movies.view);
  var [createMovies, setCreateMovies] = useState(movies.create);
  var [deleteMovies, setDeleteMovies] = useState(movies.delete);
  var [updateMovies, setUpdateMovies] = useState(movies.edit);
  var editedPermissionsId = permissionsDetails.id;

  function onPermissionChange(e, collection, action) {
    if (e.target.checked == true) collection == "subscriptions" ? setViewSubscriptions(true) : setViewMovies(true);
    var permissionValue = e.target.checked;
    switch (action) {
      case "view":

        collection == "subscriptions" ? setViewSubscriptions(permissionValue) : setViewMovies(permissionValue)
        if (!permissionValue) {
          collection == "subscriptions" ? setCreateSubscriptions(false) : setCreateMovies(false)
          collection == "subscriptions" ? setDeleteSubscriptions(false) : setDeleteMovies(false)
          collection == "subscriptions" ? setUpdateSubscriptions(false) : setUpdateMovies(false)
        }
        break;
      case "create":
        collection == "subscriptions" ? setCreateSubscriptions(permissionValue) : setCreateMovies(permissionValue)
        break;
      case "update":
        collection == "subscriptions" ? setUpdateSubscriptions(permissionValue) : setUpdateMovies(permissionValue)
        break;
      case "delete":
        collection == "subscriptions" ? setDeleteSubscriptions(permissionValue) : setDeleteMovies(permissionValue)
        break;
      default:
        throw new Error("Change permission error: unknown option")
    }
  }

  function getFieldsData() {

    return [
      { type: "text", onChange: e => setFirstName(e.target.value), label: "First Name:", name: "firstName", value: firstName || "" },

      { type: "text", onChange: e => setLastName(e.target.value), label: "Last Name:", name: "lastName", value: lastName || "" },

      { type: "text", onChange: e => setUserName(e.target.value), label: "User Name:", name: "userName", value: userName || "" },

      { type: "text", onChange: e => setSessionTimeOut(e.target.value), label: "Session Timeout:", name: "sessionTimeout", value: sessionTimeOut || "" },

      { type: "fixed", label: "Created date:", name: "Created", value: createdDate || "" },

      { type: "checkbox", onChange: (e => onPermissionChange(e, "subscriptions", "view")), label: "View Subscriptions:", checked: viewSubscriptions, name: "viewSubscriptions" },

      {
        type: "checkbox", onChange: (e => onPermissionChange(e, "subscriptions", "create")), label: "Create Subscriptions:", checked: createSubscriptions, name: "createSubscriptions"
      },

      { type: "checkbox", onChange: (e => onPermissionChange(e, "subscriptions", "delete")), label: "Delete Subscriptions:", checked: deleteSubscriptions, name: "deleteSubscriptions" },

      { type: "checkbox", onChange: (e => onPermissionChange(e, "subscriptions", "update")), label: "Update Subscriptions:", checked: updateSubscriptions, name: "updateSubscriptions" },

      { type: "checkbox", onChange: (e => onPermissionChange(e, "movies", "view")), label: "View Movies:", checked: viewMovies, name: "viewMovies" },
      { type: "checkbox", onChange: (e => onPermissionChange(e, "movies", "create")), label: "Create Movies:", checked: createMovies, name: "createMovies" },
      { type: "checkbox", onChange: (e => onPermissionChange(e, "movies", "delete")), label: "Delete Movies:", checked: deleteMovies, name: "deleteMovies" },
      { type: "checkbox", onChange: (e => onPermissionChange(e, "movies", "update")), label: "Update Movies:", checked: updateMovies, name: "updateMovies" }
    ]
  }



  if (!(userDetails instanceof Object)) {
    throw Error("UserForm must get userDetails prop which is an object instance")
  }
  var { usersManagementUrl } = useContext(UsersManagementContext)
  var data = getFieldsData(userDetails);

  function onFormSubmit(event) {
    event.preventDefault();
    var userDetails = { id: editedUserId, firstName, lastName, userName, sessionTimeOut }

    var permissionsDetails = {
      id: editedPermissionsId,
      userId: editedUserId,
      permissions: {
        subscriptions: {
          view: viewSubscriptions,
          edit: updateSubscriptions,
          delete: deleteSubscriptions,
          create: createSubscriptions
        },
        movies: {
          view: viewMovies,
          edit: updateMovies,
          delete: deleteMovies,
          create: createMovies
        }

      }
    }
    onSubmit(userDetails, permissionsDetails)
  }
  return (
    <form onSubmit={onFormSubmit}>
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