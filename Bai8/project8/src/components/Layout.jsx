import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Background from './Background'
import useUIStore from '../store/useUIStore'

const Layout = () => {
  const { sidebarOpen } = useUIStore()

  return (
    <Background>
      <div className="min-h-screen">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className={`flex-1 p-4 lg:p-6 transition-all duration-300 ${
            sidebarOpen ? 'ml-0' : 'ml-0'
          }`}>
            <Outlet />
          </main>
        </div>
      </div>
    </Background>
  )
}

export default Layout
