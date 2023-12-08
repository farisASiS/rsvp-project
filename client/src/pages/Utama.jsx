import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
/* import picutama from '../public/pic-utama.png'; */

export default function Utama() {
  const {currentUser} = useSelector(state => state.user);

  return (
    <main className='py-[50px] px-10 sm:flex sm:justify-between'>
      {/* <img src={picutama} alt="" className='object-cover sm:order-last'/> */}
      <div className='mt-[200px]'>
        <h1 className='text-[#4ABBD3] italic text-[20px] font-bold'>MUDAH DAN PANTAS</h1>
        <h1 className='text-white text-[48px] font-bold leading-[100%] max-w-lg'>KEMUDAHAN RSVP DI HUJUNG JARI ANDA</h1>
        <h1 className='text-white mt-2 max-w-lg'>Kemudahan RSVP secara online bagi jemputan anda dan lengkap berserta kemudahan pengendalian pendaftaran untuk urus setia dan juga pengunjung</h1>
        <div className='flex flex-col gap-5 mt-10'>
        {currentUser ? '' :
          <Link to={'/daftar-akaun'} className='flex flex-col max-w-xs'>
            <button className='gradient_background text-white p-3 drop-shadow-md rounded-3xl uppercase hover:opacity-75 
          disabled:-80 '>Daftar Sekarang</button>
          </Link>
        }
        {currentUser ?         
          <Link to={'/cipta-acara'} className='flex flex-col max-w-xs'>
            <button className='gradient_background text-white p-3 drop-shadow-md rounded-3xl uppercase hover:opacity-75 disabled:-80 '>Cipta Acara Sekarang</button>
          </Link>
        : ''}
        </div>
      </div>


    </main>
  )
}
