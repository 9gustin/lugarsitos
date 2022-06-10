import React from 'react';

import { useSession } from '../context/session';
import {getKeyData} from '../services/firebase'

export default function Home() {
  const {user, setUser} = useSession()
  const [val, setVal] = React.useState("")

  const handleClick = () => {
    if (val) {
      getKeyData(val)
        .then(data => {
          if (data?.enabled){
            setUser(data)
          }
        })
    }
  }

  React.useEffect(() => {
    if (user) {
      window.location.href = '/dashboard/maps'
    }
  }, [user])

  return (
  <main style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 20,
    alignContent: 'center',
    backgroundColor: '#FCEC52'
  }}>
    <h1 style={{
      fontSize: '3rem',
      marginBottom: 40
    }}>9</h1>
    <input type="text" value={val} onChange={e => setVal(e.target.value)} style={{
      width: '100%',
      marginBottom: '20px',
      padding: 10,
      fontSize: '1rem',
      border: 'none',
      backgroundColor: 'transparent',
      borderBottom: '1px solid black'
    }}/>
    <button type='button' onClick={handleClick} style={{
      fontSize: '1rem',
      padding: 10,
      width: '60%',
      borderRadius: 8,
      border: 'none',
      backgroundColor: 'transparent',
      border: '1px solid black'
    }}>
      Ingresar
    </button>
  </main>
  )
}
