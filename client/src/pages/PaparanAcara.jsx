import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiPlusCircle } from "react-icons/bi";
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

  useEffect(() => {

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
    handleShowListings();
  }, []);



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
    <div className='p-3 mb-20 max-w-lg mx-auto'>
      <h1 className='text-white text-5xl text-center font-semibold my-7'>Paparan Acara</h1>

      {userListings && 
        userListings.length > 0 && 
        <div className='z-0 mb-5 flex flex-col gap-4'>
        <Link to="/cipta-acara" className='b bg-white flex justify-between border-solid border-2 p-3 drop-shadow-md rounded-lg hover:opacity-75 
        disabled:-80' >
          <div className='text-[#0086A4] font-semibold'>CIPTA ACARA BARU</div>
          <BiPlusCircle className='h-6 w-6 text-[#0086A4]'/>
        </Link>
          {userListings.map((listing) => (
            <div key={listing._id}
            className='b bg-white border border-[#0086A4] drop-shadow-md rounded-lg p-3 flex justify-between items-center gap-4'>
              <Link to={`/acara/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover" 
                className='h-16 w-16 object-contain border rounded-lg shadow-md'/>
              </Link>
              <Link className='flex-1 text-[#0086A4] font-semibold hover:underline truncate' 
              to={`/acara/${listing._id}`}>
                <p>{listing.title}</p>
              </Link>

              <div className='flex flex-col items-center'>
                <button onClick={() => handleListingDelete(listing._id)} className='text-red-700 uppercase'>Hapus</button>
                <Link to={`/kemaskini-acara/${listing._id}`}>
                <button className='text-green-700 uppercase'>Kemaskini</button>
                </Link>
                <Link to={`/kemaskini-acara/rsvp/${listing._id}`}>
                <button className='text-slate-700 uppercase'>RSVP</button>
                </Link>
              </div>
            </div>
          ))}
        </div>}
    </div>
  );
}
