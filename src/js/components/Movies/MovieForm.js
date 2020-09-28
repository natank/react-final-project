import React, { useContext, } from 'react'
import { Link } from 'react-router-dom'
import { MoviesManagementContext } from '../../Context/movies-management-context'
import { useFormInput } from '../../Utils/customHooks'

export default function MovieForm({ movieDetails, actionText, onSubmitCb }) {

  var { moviesManagementUrl } = useContext(MoviesManagementContext)
  var { id, name, generes, image, premiered } = movieDetails || {};

  name = useFormInput(name || "")
  generes = useFormInput(generes ? generes.toString() : "")
  image = useFormInput(image || "")
  premiered = useFormInput(premiered || "")


  return (
    <form onSubmit={onSubmit}>
      <label>Name:<input type="text" {...name} /></label><br />
      <label>Generes:<input type="text" {...generes} /></label><br />
      <label>Image URL:<input type="text" {...image} /></label><br />
      <label>Premiered:<input type="date" {...premiered} /></label><br />


      <button type="submit">{actionText}</button>
      <Link to={`${moviesManagementUrl}`}>
        <button type="button">Cancel</button>
      </Link>

    </form>
  )

  function onSubmit(event) {
    event.preventDefault();
    var inputs = { name, generes, image, premiered }

    var updatedDetails = { id: id }
    for (const [key, input] of Object.entries(inputs)) {
      updatedDetails[key] = input.value
      input.onReset()
    }

    onSubmitCb(updatedDetails)
  }
}





