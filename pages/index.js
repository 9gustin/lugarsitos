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

  return (<main>
    <input type="text" value={val} onChange={e => setVal(e.target.value)}/>
    <button type='button' onClick={handleClick}>
      Ingresar
    </button>
  </main>)
}
