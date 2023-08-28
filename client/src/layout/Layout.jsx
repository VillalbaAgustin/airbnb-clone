import React from 'react'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='py-4 px-72 flex flex-col min-h-screen'>
      <Header/>
      <Outlet/>
    </div>
  )
}
