import { useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";

import { Link } from "react-router-dom";

export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <header className='p-5 w-[100%] bg-[#006981]  drop-shadow-md'>
      <div className='flex flex-row justify-between space-x-2'>
          <Link className='grow' to='/'>
              <span className='text-white text-2xl font-semibold'>e-Hadir</span>
          </Link>
          {currentUser ? 
            <Link className='' to='/akaun'>
              <CgProfile className='text-white h-8 w-8' />
            </Link>:
            <Link className='' to='/daftar-akaun'>
              <span className='text-white text-2xl self-center'>Daftar</span>
            </Link>
          }
      </div>
    </header>
  )
}

