import React, { useMemo } from 'react'
import { SessionContext } from './context'

const userkey = 'user'

export const SessionProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const jsonUser = localStorage.getItem(userkey)

      if (jsonUser) {
        return JSON.parse(jsonUser)
      }
      return null
    }
  })

  const returnedValue = useMemo(() => ({user, setUser}), [user, setUser])

  React.useEffect(() => {
    if (user) {
      console.warn(user)
      localStorage.setItem(userkey, JSON.stringify(user))
    }
  }, [user])

  return (
    <SessionContext.Provider value={returnedValue}>
      {children}
    </SessionContext.Provider>
  )
}