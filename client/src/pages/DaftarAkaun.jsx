import { useState } from 'react'
import { Link } from "react-router-dom";


export default function DaftarAkaun() {
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };
  console.log(formData);



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className = 'text-3xl text-center font-semibold my-7'>Daftar Akaun</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='nama pengguna'
        className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="text" placeholder='email'
        className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='kata laluan'
        className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button className='bg bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:-80'>Daftar Masuk</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Sudah mempunyai akaun?</p>
        <Link to={'/daftar-masuk'}>
          <span className='text-blue-700'>Daftar Masuk</span>
        </Link>
      </div>
    </div>
  )
}
