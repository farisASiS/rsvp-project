import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { FaPenSquare } from "react-icons/fa";
import { 
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from '../redux/user/userSlice';



export default function DropdownAkaun() {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();


  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
      
    }
  };


  return (
    <div>
      <ul className='grid absolute top-[60px] right-7 bg-white w-auto text-right border rounded-xl p-3'>
        <CgProfile className='h-[50px] w-[50px] justify-self-end text-[#0086A4]'/>
        <li className='text-2xl font-semibold text-[#0086A4]'>{currentUser ? currentUser.username : ''}</li>
        <li className='text-sm text-slate-400'>{currentUser ? currentUser.email : ''}</li>
        <hr className=' mt-1'/>
        <Link className='flex flex-row-reverse items-center gap-2' to='/'>
          <FaHome className='h-7 w-7 m-1 text-[#0086A4]'/>
          <li className='text-lg text-slate-600'>Utama</li>
        </Link>
        <Link className='flex flex-row-reverse items-center gap-2' to='/akaun'>
          <CgProfile className='h-7 w-7 m-1 text-[#0086A4]'/>
          <li className='text-lg text-slate-600'>Akaun</li>
        </Link>
        <Link className='flex flex-row-reverse items-center gap-2' to='/utama'>
          <FaPenSquare className='h-7 w-7 m-1 text-[#0086A4]'/>
          <li className='text-lg text-slate-600'>Acara</li>
        </Link>
        <hr />
        <button onClick={handleSignOut} className='flex flex-row-reverse items-center gap-2' to='/utama'>
          <CiLogout className='h-7 w-7 m-1 text-[#0086A4]'/>
          <li className='text-lg text-slate-600'>Daftar Keluar</li>
        </button>

      </ul>
    </div>
  )
}
