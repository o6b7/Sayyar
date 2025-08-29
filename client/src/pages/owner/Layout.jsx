import React from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { AnimatedContainer } from '../../utils/animation/containerVariants'
import { useAppContext } from '../../context/AppContext'
import { useEffect } from 'react'

const Layout = () => {
  const {isOwner, navigate} = useAppContext();

  useEffect (() => {
    if(!isOwner) {
      navigate('/')
    }
  }, [isOwner])

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarOwner />
      <div className="flex flex-1">
        <Sidebar />
        <AnimatedContainer className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto" scrollTrigger={false}>
          <Outlet />
        </AnimatedContainer>
      </div>
    </div>
  )
}

export default Layout