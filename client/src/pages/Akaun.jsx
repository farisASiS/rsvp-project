import { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure, 
  updateUserStart, 
  updateUserSuccess, 
} from '../redux/user/userSlice';

export default function Akaun() {

  const { currentUser, loading, error } = useSelector(state => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

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
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success ===false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  };

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

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`,{
      method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) => 
      prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='p-3 mb-5 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Hi {currentUser.username}!</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <CgProfile className='h-24 w-24 self-center'/>
        <input 
          type="text" 
          placeholder='nama pengguna' 
          defaultValue={currentUser.username}
          className='border p-3 rounded-lg' 
          id='username' 
          onChange={handleChange}
        />
        <input 
          type="email" 
          placeholder='email' 
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg' 
          id='email' 
          onChange={handleChange}
        />
        <input 
          type="text" 
          placeholder='kata laluan' 
          className='border p-3 rounded-lg' 
          id='password' 
          onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg 
          p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Kemaskini'}
        </button>
        <Link to="/cipta-acara" className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' >
          Cipta acara
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Hapus Akaun</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Daftar Keluar</span>
      </div>
      <p className='text-red-700 mt-5' >{error ? error: ''}</p>
      <p className='text-green-700 mt-5' >{updateSuccess ? 'Akaun berjaya dikemaskini!': ''}</p>
      <button onClick={handleShowListings} className='text-green-700 w-full'>Paparan Acara</button>
      <p className='text-red-700 mt-5'>{showListingsError ? 
      'Kesilapan paparan acara':''}</p>

      {userListings && 
        userListings.length > 0 && 
        <div className='mb-20 flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>Acara Anda</h1>
          {userListings.map((listing) => (
            <div key={listing._id}
            className='border rounded-lg p-3 flex justify-between items-center gap-4'>
              <Link to={`/acara/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover" 
                className='h-16 w-16 object-contain'/>
              </Link>
              <Link className='flex-1 text-slate-700 font-semibold hover:underline truncate' 
              to={`/acara/${listing._id}`}>
                <p>{listing.title}</p>
              </Link>

              <div className='flex flex-col items-center'>
                <button onClick={() => handleListingDelete(listing._id)} className='text-red-700 uppercase'>Hapus</button>
                <button className='text-green-700 uppercase'>Kemaskini</button>
              </div>
            </div>
          ))}
        </div>}
    </div>
  );
}
