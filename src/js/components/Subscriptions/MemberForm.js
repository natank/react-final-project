import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { MainContext } from '../../Context/main-context'
import { useFormInput } from '../../Utils/customHooks'
export default function MemberForm({ memberDetails, actionText, onSubmitCb }) {

  var { membersManagementUrl } = useContext(MainContext)
  var { name, email, city } = memberDetails || {};

  var name = useFormInput(name || "");
  var email = useFormInput(email || "")
  var city = useFormInput(city || "")

  return (
    <form onSubmit={onSubmit}>
      <label>Name:<input type="text" {...name} /></label><br />
      <label>Email:<input type="text" {...email} /></label><br />
      <label>City:<input type="text" {...city} /></label><br />

      <button type="submit">{actionText}</button>
      <Link to={`${membersManagementUrl}`}>
        <button type="button">Cancel</button>
      </Link>

    </form>
  )

  function onSubmit(event) {
    event.preventDefault();
    var updatedDetails = { ...memberDetails }

    var inputs = { name, email, city };
    for (const [key, input] of Object.entries(inputs)) {
      updatedDetails[key] = input.value
      input.onReset()
    }
    onSubmitCb(updatedDetails)
  }
}


