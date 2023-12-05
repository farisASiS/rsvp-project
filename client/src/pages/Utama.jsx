import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Utama() {
  const {currentUser} = useSelector(state => state.user);

  return (
    <div className='gradient_background py-[200px] px-10 4'>
      <h1 className='text-[#87DCCF] italic text-[20px] font-bold'>MUDAH DAN PANTAS</h1>
      <h1 className='text-white text-[48px] font-bold leading-[100%]'>KEMUDAHAN RSVP DI HUJUNG JARI ANDA</h1>
      <h1 className='text-white mt-2'>Kemudahan RSVP secara online bagi jemputan anda dan lengkap berserta kemudahan pengendalian pendaftaran untuk urus setia dan juga pengunjung</h1>
      <div className='flex flex-col gap-5 mt-10'>
      {currentUser ? '' :
        <Link to={'/daftar-akaun'} className='flex flex-col '>
          <button className='bg-[#44BBB2] text-white p-3 drop-shadow-md rounded-3xl uppercase hover:opacity-75 
        disabled:-80 '>Daftar Sekarang</button>
        </Link>
      }
      {currentUser ? '' :
        <h1 className='text-white text-center'>Sudah mempunyai akaun?</h1>
      }
      {currentUser ? '' :
        <Link to={'/daftar-masuk'} className='flex flex-col '>
          <button className='border-solid border-2 border-white text-white p-3 drop-shadow-md rounded-3xl uppercase hover:opacity-75 disabled:-80'>Daftar Masuk</button>
        </Link>
      }
      {currentUser ?         
        <Link to={'/cipta-acara'} className='flex flex-col '>
          <button className='bg-[#44BBB2] text-white p-3 drop-shadow-md rounded-3xl uppercase hover:opacity-75 disabled:-80 '>Cipta Acara Sekarang</button>
        </Link>
      : ''}
      </div> : <div></div> 



    </div>
  )
}
