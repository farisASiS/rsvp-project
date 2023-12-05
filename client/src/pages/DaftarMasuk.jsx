import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { 
  signInStart, 
  signInSuccess, 
  signInFailure 
} from '../redux/user/userSlice';


export default function DaftarMasuk() {
  const [formData, setFormData] = useState({});
  const { loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/akaun');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='gradient_background p-3 pt-20 max-w-lg mx-auto'>
      <h1 className = 'text-white text-5xl text-center font-semibold my-7'>Daftar Masuk</h1>
      <CgProfile className='text-white mx-auto h-[150px] w-[150px] my-7' />

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='email'
        className='border p-3 rounded-3xl drop-shadow-md' id='email' onChange={handleChange}/>
        <input type="password" placeholder='kata laluan'
        className='border p-3 rounded-3xl drop-shadow-md' id='password' onChange={handleChange}/>
        <button disabled = {loading} className='bg-[#44BBB2] text-white p-3 drop-shadow-md rounded-3xl uppercase hover:opacity-75 
        disabled:-80 my-5'>
          {loading ? 'Loading...' : 'Daftar Masuk'}
          </button>
      </form>
      <div>
        <p className='text-white text-center'>Belum mempunyai akaun?</p>
        <Link to={'/daftar-akaun'} className='flex flex-col gap-4 my-5'>
          <button className='border-solid border-2 border-white text-white p-3 drop-shadow-md rounded-3xl uppercase hover:opacity-75 
        disabled:-80'>Daftar Akaun</button>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
