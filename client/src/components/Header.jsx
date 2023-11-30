import {FaHome} from 'react-icons/fa';
import { IoMdTimer } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { SlNote } from "react-icons/sl";
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';

import { Link } from "react-router-dom";

export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <header className='bg bg-slate-800 p-2 fixed bottom-0 w-[100%]'>
      <div className='flex flex-row space-x-2'>
          <Link className='grow' to='/'>
            <div className=' flex flex-col'>
              <FaHome className='text-slate-500 h-12 w-12 self-center' /> 
              <span className='text-white self-center'>Utama</span>
            </div>
          </Link>
          <Link className='grow' to='/aturcara'>
            <div className=' flex flex-col'>
              <IoMdTimer className='text-slate-500 h-12 w-12 self-center' /> 
              <span className='text-white self-center'>Aturcara</span>
            </div>
          </Link>
          <Link className='grow' to='/lokasi'>
            <div className=' flex flex-col'>
              <FaMapLocationDot className='text-slate-500 h-12 w-12 self-center' /> 
              <span className='text-white self-center'>Lokasi</span>
            </div>
          </Link>
          <Link className='grow' to='/rsvp'>
            <div className=' flex flex-col'>
              <SlNote className='text-slate-500 h-12 w-12 self-center' /> 
              <span className='text-white self-center'>RSVP</span>
            </div>
          </Link>
          {currentUser ? 
            <Link className='grow' to='/akaun'>
              <div className=' flex flex-col'>
              <CgProfile className='text-slate-500 h-12 w-12 self-center' /> 
              <span className='text-white self-center'>Akaun</span>
              </div>
            </Link>:
            <Link className='grow' to='/daftar-akaun'>
              <div className=' flex flex-col'>
              <CiLogin className='text-slate-500 h-12 w-12 self-center' /> 
              <span className='text-white self-center'>Daftar</span>
              </div>
            </Link>
          }
      </div>
    </header>
  )
}

{/*           <Link className='grow' {currentUser ? to='/daftar-akaun':
            to='/daftar-akaun'}>
            {currentUser ? 
              <div className='bg bg-slate-400'>
              <CgProfile className='text-slate-500 h-12 w-12' />
              <span>Profil</span>
              </div>
              : <div className='bg bg-slate-400'>
                <CiLogin className='text-slate-500 h-12 w-12' /> 
                <span>Daftar</span>
              </div>
            }
          </Link> */}