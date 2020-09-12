import React, { useState } from 'react'


function EditUser(props = { userDetails }) {
    var data = getFieldsData(userDetails);
    return (
        <div>
            <h2>Edit User: {`${userDetails.firstName} ${userDetails.lastName}`}</h2>
            <form>
                {renderFields(data.slice(0, 4))}
                <label>Permissions</label>
                {renderFields(data.slice(4))}
            </form>
        </div>
    )
}

function getFieldsData({ firstName, lastName, userName, sessionTimeOut, createdDate, permissions }) {
    return [
        { type: "text", onChange: (() => null), label: "First Name:", name: "firstName", value: userDetails.firstName },
        { type: "text", onChange: (() => null), label: "Last Name:", name: "lastName", value: userDetails.lastName },
        { type: "text", onChange: (() => null), label: "User Name:", name: "userName", value: userDetails.userName },
        { type: "text", onChange: (() => null), label: "Session Name:", name: "sessionName", value: userDetails.sessionName },

        { type: "checkbox", onChange: (() => null), label: "View Subscriptions:", checked: permissions.viewSubscriptions, name: "viewSubscriptions" },
        { type: "checkbox", onChange: (() => null), label: "Create Subscriptions:", checked: permissions.changeSubscriptions, name: "createSubscriptions" },
        { type: "checkbox", onChange: (() => null), label: "Delete Subscriptions:", checked: permissions.createSubscriptions, name: "deleteSubscriptions" },
        { type: "checkbox", onChange: (() => null), label: "Update Subscriptions:", checked: permissions.deleteSubscriptions, name: "updateSubscriptions" },

        { type: "checkbox", onChange: (() => null), label: "View Movies:", checked: permissions.viewMovies, name: "viewMovies" },
        { type: "checkbox", onChange: (() => null), label: "Create Movies:", checked: permissions.createMovies, name: "createMovies" },
        { type: "checkbox", onChange: (() => null), label: "Delete Movies:", checked: permissions.deleteMovies, name: "deleteMovies" },
        { type: "checkbox", onChange: (() => null), label: "Update Movies:", checked: permissions.updateMovies, name: "updateMovies" }
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

var userDetails = {
    firstName: "Avi",
    lastName: "Cohen",
    userName: "avi@gmail.com",
    sessionTimeOut: 60,
    createdDate: "11/12/1998",
    permissions: {
        viewSubscriptions: true,
        createSubscriptions: false,
        deleteSubscriptions: false,
        updateSubscriptions: false,
        viewMovies: true,
        createMovies: true,
        deleteMovies: false,
        updateMovies: false,

    }
}

export default EditUser;