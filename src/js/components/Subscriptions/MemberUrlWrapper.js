import React, {useContext} from 'react'
import {MainContext} from "../../Context/main-context"
import MemberDetails from './MemberDetails'

export default function MemberUrlWrapper({match}){
    var {membersStore} = useContext(MainContext);

    var [membersState, membersDispatch] = membersStore;
    var {members}= membersState;

    var member = members.find(member=> member.id = match.params.id)
    
    


    return(
        <MemberDetails {...{member, match}}/>
    )
}