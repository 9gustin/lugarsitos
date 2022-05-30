import React, {useState, useEffect} from 'react'

import {getKeyData, getElements} from '../services/firebase'

export default function Read() {
    const [data, setData] = useState()

    useEffect(() => {
        getKeyData('9BT1o2ZpyuHBNBBsABC7')
        getElements()
    }, [])

    return <p>hola</p>
  }
  