import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserList from './UserList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserList />
  </StrictMode>,
)
