import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiLogin } from "react-icons/ci";


export default function DropdownAkaun() {

  return (
    <div className=''>
      <ul className='grid absolute top-[60px] right-7 bg-white w-auto text-right border rounded-xl p-3'>
        <Link className='flex flex-row-reverse items-center gap-2' to='/'>
          <FaHome className='h-7 w-7 m-1 text-[#0086A4]'/>
          <li className='text-lg text-slate-600'>Utama</li>
        </Link>
        <Link className='flex flex-row-reverse items-center gap-2' to='/daftar-akaun'>
          <CgProfile className='h-7 w-7 m-1 text-[#0086A4]'/>
          <li className='text-lg text-slate-600'>Daftar Akaun</li>
        </Link>
        <Link className='flex flex-row-reverse items-center gap-2' to='/daftar-masuk'>
          <CiLogin className='h-7 w-7 m-1 text-[#0086A4]'/>
          <li className='text-lg text-slate-600'>Daftar Masuk</li>
        </Link>

      </ul>
    </div>
  )
}
