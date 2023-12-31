import { useSelector } from 'react-redux';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import DropdownAkaun from './DropdownAkaun';
import DropdownGuest from './DropdownGuest';
import { useEffect, useState } from 'react';
import { IoIosArrowDropupCircle } from "react-icons/io";
import { createPortal } from 'react-dom';


export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  const [dropDownState, setDropDownState] = useState(false);

  /* useEffect(
    () => setDropDownState(false)
  ); */


  return (
    <header className='p-5 w-[100%]  drop-shadow-md'>
      <div className='flex flex-row justify-between space-x-2'>
          <Link className='grow' to='/'>
            <span className='text-white text-2xl font-semibold'>e-Hadir</span>
          </Link>
          <button onClick={() => setDropDownState((prev) => !prev)} className='' to='/akaun'>
            {dropDownState ?
              <IoIosArrowDropupCircle className='text-white h-8 w-8' /> :
              <RxHamburgerMenu className='text-white h-8 w-8' />
            }
          </button>
          {dropDownState && 
          createPortal(
            <div>
            {currentUser ? 
            <DropdownAkaun/> : <DropdownGuest/>
            }
            </div>, document.body)
          }
      </div>
    </header>
  )
}

