import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";


export default function DaftarAkaun() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      };
      setLoading(false);
      setError(null);
      alert('Akaun berjaya didaftarkan!');
      navigate('/daftar-masuk');
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error.message);

    }
  };
  return (
    <div className='gradient_background px-3 pt-20  max-w-lg mx-auto'>
      <h1 className = 'text-white text-5xl text-center font-semibold my-7'>Daftar Akaun</h1>
      <CgProfile className='text-white mx-auto h-[150px] w-[150px] my-7' />
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='nama pengguna'
        className='border p-3 rounded-3xl drop-shadow-md' id='username' onChange={handleChange}/>
        <input type="text" placeholder='email'
        className='border p-3 rounded-3xl drop-shadow-md' id='email' onChange={handleChange}/>
        <input type="password" placeholder='kata laluan'
        className='border p-3 rounded-3xl drop-shadow-md' id='password' onChange={handleChange}/>
        <button disabled = {loading} className='bg-[#44BBB2] text-white p-3 drop-shadow-md rounded-3xl uppercase hover:opacity-75 
        disabled:-80 my-5'>
          {loading ? 'Loading...' : 'Daftar Akaun'}
          </button>
      </form>
      <div>
        <p className='text-white text-center'>Sudah mempunyai akaun?</p>
        <Link to={'/daftar-masuk'} className='flex flex-col gap-4 my-5'>
          <button className='border-solid border-2 border-white text-white p-3 drop-shadow-md rounded-3xl uppercase hover:opacity-75 
        disabled:-80'>Daftar Masuk</button>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
