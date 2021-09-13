import React, { useState } from 'react'

export const MyContext = React.createContext()

function AppContext(props) {
  const [globalState, setGlobalState] = useState({ token: '' })

  const handleGlobalState = (data) => {
    setGlobalState({ ...globalState, ...data })
  }

  return (
    <MyContext.Provider value={[globalState, handleGlobalState]}>
      {props.children}
    </MyContext.Provider>
  )
}

export default AppContext
