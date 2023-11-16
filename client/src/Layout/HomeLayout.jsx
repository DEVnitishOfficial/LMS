/* eslint-disable react/prop-types */
import {AiFillCloseCircle} from 'react-icons/ai'
import {FiMenu} from 'react-icons/fi'
import {Link} from 'react-router-dom'

import Footer from '../components/footer';
function HomeLayout({children}) {

    function changeWidth(){
        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = "auto"
    }

    function hideDrawer(){
      const element = document.getElementsByClassName('drawer-toggle');
      element[0].checked = false

      const drawerSide = document.getElementsByClassName('drawer-side');
      drawerSide[0].style.width = 0
      
    }



  return (
    <div className='min-h-[90vh] '>
     <div className="drawer absolute left-0 z-50 w-fit">
     <input id="my-drawer" type="checkbox" className="drawer-toggle" />
     <div className="drawer-content">
    <label htmlFor="my-drawer" className="cursor-pointer relative">
        <FiMenu
        onClick={changeWidth}
        size={"32px"}
        className='font-bold text-white m-4'
        
        />
    </label>
  </div> 
  <div className='drawer-side w-0'>
    <label htmlFor="my-drawer" className='drawer-overlay'>
        <ul className="menu p4 w-48 sm:w-80 bg-base-200 text-base-content relative">
          <li className='w-fit absolute right-2 z-50'>
            <button onClick={hideDrawer}>
            <AiFillCloseCircle size={"24px"} />
            </button>
          </li>
          <li>
            <Link to='/'>Home</Link>
          </li>

          <li>
            <Link to='/courses'>All courses</Link>
          </li>

          <li>
            <Link to='/contact'>Contect Us</Link>
          </li>

          <li>
            <Link to='/about'>About us</Link>
          </li>
        </ul>
    </label>

  </div>

     </div>

      {children}
      <Footer />
    </div>
  )
}

export default HomeLayout