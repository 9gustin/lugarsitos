import React, { useMemo } from 'react'
import { SessionContext } from './context'

export const SessionProvider = ({ children }) => {
  const returnedValue = useMemo(() => ({}), [])

  return (
    <SessionContext.Provider value={returnedValue}>
      {children}
    </SessionContext.Provider>
  )
}