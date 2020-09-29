import React, { useContext } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import MemberForm from './MemberForm';
import { MainContext } from '../../Context/main-context'
import { updateMember } from '../../Model/member-model'
import { compareItemId } from '../../Utils/utils'
import { MembersManagementContext } from '../../Context/members-management-context'
export default function EditMember() {
    var { membersManagementUrl } = useContext(MembersManagementContext)
    let match = useRouteMatch();
    var { membersStore } = useContext(MainContext)
    var [membersState, membersDispatch] = membersStore;
    var { members } = membersState
    var memberId = match.params.id;
    let memberDetails = members.find(compareItemId(memberId))
    var history = useHistory();

    return (
        <div>
            <h2>Edit Member: {`${memberDetails ? memberDetails.name : ""}`}</h2>
            {memberDetails ? <MemberForm memberDetails={memberDetails} actionText="Update" onSubmitCb={onUpdateMember} /> : null}
        </div>
    )

    async function onUpdateMember(memberDetails) {
        var details = { ...memberDetails }
        var members = await updateMember(details);
        membersDispatch({
            type: "LOAD",
            payload: { members }
        })
        history.push(membersManagementUrl)
    }
}



