import React from 'react';
import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';

export default function Akaun() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Akaun</h1>
      <form className='flex flex-col gap-4'>
      <CgProfile className='h-24 w-24 self-center'/>
        <input type="text" placeholder='nama pengguna' className='border p-3 rounded-lg' id='username' />
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' />
        <input type="text" placeholder='kata laluan' className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Kemaskini</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Hapus Akaun</span>
        <span className='text-red-700 cursor-pointer'>Daftar Keluar</span>
      </div>
    </div>
  )
}
