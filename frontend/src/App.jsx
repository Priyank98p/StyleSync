import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

function App() {
  return (
  
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <SearchBar />
      {/* Acts as a dynamic placeholder where React Router automatically injects the matching child page component (like Home or Cart) based on the current URL, keeping the Navbar and Footer constant. */}
      <Outlet />
      <Footer />
    </div>
  )
}

export default App