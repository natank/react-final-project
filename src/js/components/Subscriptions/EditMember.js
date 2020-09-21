import React from 'react'


import MemberForm from './MemberForm';

var memberDetails = {
    id: 4,
    Name: "Under the dome",
    Generes: ["Genere1", "Genere2"],
    Image: "https://via.placeholder.com/600/771796",
    Premiered: new Date(Date.UTC(72, 4, 5))
}

export default function EditMember() {
    return (
        <div>
            <h2>Edit Member: {`${memberDetails.firstName} ${memberDetails.lastName}`}</h2>
            <MemberForm memberDetails={memberDetails} actionText="Update" onSubmit={onUpdateMember} />

        </div>
    )

    function onUpdateMember(event) {
        event.preventDefault();
        return 0;
    }
}



