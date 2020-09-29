import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MembersManagementContext } from '../../Context/members-management-context'
import { useFormInput } from '../../Utils/customHooks'
export default function MemberForm({ memberDetails, actionText, onSubmitCb }) {

  if (!(memberDetails instanceof Object)) {
    throw Error("MemberForm must get memberDetails prop which is an object instance")
  }

  var { membersManagementUrl } = useContext(MembersManagementContext)
  var name = useFormInput(memberDetails.name);
  var email = useFormInput(memberDetails.email)
  var city = useFormInput(memberDetails.city)

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


