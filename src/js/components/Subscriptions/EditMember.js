import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { MainContext } from '../../Context/main-context'
import MemberForm from './MemberForm';
import { updateMember } from '../../Model/member-model'
import { compareItemId } from '../../Utils/utils'
import { MembersManagementContext } from '../../Context/members-management-context'
export default function EditMember(props) {
    var { store, membersManagementUrl } = useContext(MainContext)
    var [state, dispatch] = store;
    var match = useRouteMatch();
    var memberId = match.params.id;
    var { members } = state;

    var [componentState, setComponentState] = useState({
        redirect: false,
        updatedMemberDetails: {}
    })

    let editedMember = members.find(compareItemId(memberId))

    var history = useHistory();

    useEffect(() => {
        if (componentState.redirect)
            dispatch({
                type: "UPDATE_MEMBER",
                payload: { member: { ...componentState.updatedMemberDetails } }
            })
    }, [componentState])

    useEffect(() => {
        componentState.redirect && history.push(membersManagementUrl)
    })


    return (
        <div>
            {editedMember ?
                <div>
                    <h2>Edit Member: {`${editedMember.name}`}</h2>
                    {editedMember ? <MemberForm memberDetails={editedMember} actionText="Update" onSubmitCb={onUpdateMember} /> : null}
                </div> : <div>{null}</div>
            }
        </div>
    )

    async function onUpdateMember(memberDetails) {
        var details = { ...memberDetails }
        var updatedMemberDetails = await updateMember(memberId, details);
        setComponentState({
            redirect: true,
            updatedMemberDetails
        })
    }
}



