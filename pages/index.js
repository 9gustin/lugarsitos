import React from 'react';

import Scanner from '../components/Scanner/Scanner';
import { useSession } from '../context/session';

export default function Home() {
  const value = useSession()

  return <>
  App login  </>
}
