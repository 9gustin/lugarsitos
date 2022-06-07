import React, { useMemo } from 'react'
import { SessionContext } from './context'

export const SessionProvider = ({ children }) => {
  const [user, setUser] = React.useState(null)

  const returnedValue = useMemo(() => ({user, setUser}), [user, setUser])

  return (
    <SessionContext.Provider value={returnedValue}>
      {children}
    </SessionContext.Provider>
  )
}