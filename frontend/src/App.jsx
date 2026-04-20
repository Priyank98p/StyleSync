import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, } from 'react-toastify';
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  return (
  
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <SkeletonTheme baseColor="#f3f4f6" highlightColor="#ffffff">

      <Navbar />
      <SearchBar />
      <Outlet />
      <Footer />
      </SkeletonTheme>
    </div>
  )
}

export default App