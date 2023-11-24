import {FaHome} from 'react-icons/fa';
import { IoMdTimer } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { SlNote } from "react-icons/sl";
import { CiLogin } from "react-icons/ci";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className='bg bg-slate-800 p-2 fixed bottom-0 w-[100%]'>
      <div className='flex flex-row space-x-2'>
          <Link className='grow ' to='/'>
            <div className='bg bg-slate-400'>
              <FaHome className='text-slate-500' /> 
              <span className='text-white'>Header</span>
            </div>
          </Link>
          <Link className='grow' to='/aturcara'>
            <div className='bg bg-slate-400'>
              <IoMdTimer className='text-slate-500' /> 
              <span>Aturcara</span>
            </div>
          </Link>
          <Link className='grow' to='/lokasi'>
            <div className='bg bg-slate-400'>
              <FaMapLocationDot className='text-slate-500' /> 
              <span>Lokasi</span>
            </div>
          </Link>
          <Link className='grow' to='/rsvp'>
            <div className='bg bg-slate-400'>
              <SlNote className='text-slate-500' /> 
              <span>RSVP</span>
            </div>
          </Link>
          <Link className='grow' to='/log-in'>
            <div className='bg bg-slate-400'>
              <CiLogin className='text-slate-500' /> 
              <span>Log In</span>
            </div>
          </Link>
      </div>
    </header>
  )
}
