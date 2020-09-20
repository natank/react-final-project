import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MoviesManagementContext } from '../../Context/movies-management-context'
export default function MovieForm({ movieDetails, actionText, onSubmit }) {

  if (!(movieDetails instanceof Object)) {
    throw Error("MovieForm must get movieDetails prop which is an object instance")
  }
  var { moviesManagementUrl } = useContext(MoviesManagementContext)
  var data = getFieldsData(movieDetails);
  return (
    <form onSubmit={onSubmit}>
      <label>Name:<input type="text" value={movieDetails.Name ? movieDetails.Name : ""} onChange={() => { }} /></label><br />
      <label>Generes:<input type="text" value={movieDetails.Generes ? MovieDetails.Generes.toString() : ""} onChange={() => { }} /></label><br />
      <label>Image URL:<input type="text" value={movieDetails.Image ? movieDetails.Image : ""} onChange={() => { }} /></label><br />
      <label>Premiered:<input type="text" value={
        movieDetails.Premiered ?
          `${movieDetails.Premiered.getDate()}/${movieDetails.Premiered.getMonth() + 1}/${movieDetails.Premiered.getFullYear()}` : ""} onChange={() => { }} /></label><br />


      <button type="submit">{actionText}</button>
      <Link to={`${moviesManagementUrl}`}>
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