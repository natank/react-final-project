import React, { createContext } from 'react'

export var MembersManagementContext = createContext([{}, function () { }]);

export var MembersManagementContextProvider = function (props) {

  var { match } = props;
  var membersManagementUrl = match.url;
  return (
    <MembersManagementContext.Provider value={{ 
      membersManagementUrl
    }}>
      {props.children}
    </MembersManagementContext.Provider>
  )
}