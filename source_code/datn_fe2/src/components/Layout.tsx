import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className='App'>
        <Outlet />
    </main>
    // <h1>Hello</h1>
  )
}

export default Layout