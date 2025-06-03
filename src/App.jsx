import React from 'react';
import RouteRenderer from '@routes/RouteRender';

import { useAuth } from '@context/AuthContext'
import { getToken } from '@services/authService';

export default function App() {
  const { user } = useAuth()

  console.log(user)
  console.log(getToken())

  return <RouteRenderer />;
}
